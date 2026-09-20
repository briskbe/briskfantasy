import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { Pool } from "pg";
import { verifyPassword } from "better-auth/crypto";

// Run with TEST_DATABASE_URL targeting a disposable local PostgreSQL database:
// node --env-file=.env.local --import ./scripts/cms-test-loader.mjs --import tsx scripts/cms-auth-smoke.mts
// Set CMS_TEST_SECURE=1 to also verify production Secure cookies over an HTTPS origin.
if (!process.env.TEST_DATABASE_URL) throw new Error("TEST_DATABASE_URL is required.");
const initialTestUrl = new URL(process.env.TEST_DATABASE_URL);
if (!["localhost", "127.0.0.1", "[::1]"].includes(initialTestUrl.hostname)) throw new Error("CMS auth tests require a disposable local PostgreSQL server.");
const admin = new Pool({ connectionString: process.env.TEST_DATABASE_URL, max: 1 });
const databaseName = `cms_auth_test_${Date.now()}_${randomBytes(4).toString("hex")}`;
await admin.query(`CREATE DATABASE "${databaseName}"`);
const testUrl = new URL(process.env.TEST_DATABASE_URL);
testUrl.pathname = `/${databaseName}`;
process.env.DATABASE_URL = testUrl.href;
process.env.CMS_OWNER_EMAIL = "cms-owner@example.test";
process.env.BETTER_AUTH_SECRET = randomBytes(48).toString("hex");
// Exercise the requested initial-password length without using real credentials.
process.env.CMS_INITIAL_PASSWORD = randomBytes(9).toString("base64url").slice(0, 9);
const secure = process.env.CMS_TEST_SECURE === "1";
process.env.BETTER_AUTH_URL = secure ? "https://localhost:3002" : "http://localhost:3002";
Object.assign(process.env, { NODE_ENV: secure ? "production" : "development" });
delete process.env.RESEND_API_KEY;
delete process.env.VERCEL;
const password = process.env.CMS_INITIAL_PASSWORD;
const email = process.env.CMS_OWNER_EMAIL;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
const base = process.env.BETTER_AUTH_URL;
const checks: string[] = [];
let getDb: (() => Pool) | undefined;

try {
  await pool.query(await readFile("migrations/cms/001-auth.sql", "utf8"));
  execFileSync(process.execPath, ["scripts/cms-bootstrap.mjs"], { env: process.env, stdio: "pipe" });
  const authModule = await import("../src/lib/cms/auth");
  const route = await import("../src/app/api/auth/[...all]/route");
  ({ getDb } = await import("../src/lib/cms/db"));
  const request = (path: string, body?: unknown, options: { cookie?: string; origin?: string | null; ip?: string } = {}) => new Request(`${base}/api/auth${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": options.ip || "127.0.0.1", ...(options.origin !== null ? { origin: options.origin || base } : {}), ...(options.cookie ? { cookie: options.cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const post = (path: string, body: unknown, options?: { cookie?: string; origin?: string | null; ip?: string }) => route.POST(request(path, body, options));
  const get = (path: string, cookie?: string) => route.GET(request(path, undefined, { cookie }));
  const cookieFrom = (response: Response) => response.headers.getSetCookie().map((cookie) => cookie.split(";")[0]).join("; ");
  const owner = (await pool.query('SELECT u.id, a.password FROM "user" u JOIN account a ON a."userId"=u.id WHERE u.email=$1', [email])).rows[0];
  assert(await verifyPassword({ hash: owner.password, password }));
  execFileSync(process.execPath, ["scripts/cms-bootstrap.mjs"], { env: { ...process.env, CMS_INITIAL_PASSWORD: "ThisMustNotReplaceExistingPassword" }, stdio: "pipe" });
  assert((await pool.query('SELECT password FROM account WHERE "userId"=$1', [owner.id])).rows[0].password === owner.password, "Repeat bootstrap must preserve the original credential.");
  checks.push("bootstrap creates scrypt credential; repeat setup preserves password");

  assert.equal((await post("/sign-up/email", { email, password, name: "Injected" })).status, 404);
  assert.equal((await post("/change-email", { newEmail: "intruder@example.test" })).status, 404);
  assert.equal((await post("/sign-in/email", { email, password }, { origin: "https://example.test" })).status, 403);
  assert.equal((await post("/sign-in/email", { email, password }, { origin: null })).status, 403);
  assert.equal((await post("/change-password", { currentPassword: password, newPassword: password })).status, 401);
  checks.push("signup and email changes blocked; missing/cross-origin POST blocked; anonymous private auth blocked");

  assert.equal((await post("/sign-in/email", { email, password: "wrong-password" }, { ip: "192.0.2.1" })).status, 401);
  const login = await post("/sign-in/email", { email, password }, { ip: "192.0.2.2" });
  assert.equal(login.status, 200);
  const cookie = cookieFrom(login);
  assert.match(login.headers.get("set-cookie") || "", /HttpOnly/i);
  assert.match(login.headers.get("set-cookie") || "", /SameSite=Lax/i);
  if (secure) assert.match(login.headers.get("set-cookie") || "", /Secure/);
  assert.equal((await pool.query('SELECT COUNT(*)::int AS count FROM "session"')).rows[0].count, 1);
  assert.equal((await authModule.getCmsSession(new Headers({ cookie })))?.user.email, email);
  const sessionResponse = await get("/get-session", cookie);
  assert.equal((await sessionResponse.json()).user.email, email);
  checks.push("owner signs in with durable HttpOnly session; server helper validates session against DB");

  await pool.query('UPDATE "user" SET email=$1 WHERE id=$2', ["different-owner@example.test", owner.id]);
  assert.equal(await authModule.getCmsSession(new Headers({ cookie })), null);
  assert.equal(await (await get("/get-session", cookie)).json(), null);
  assert.equal((await post("/sign-in/email", { email: "different-owner@example.test", password }, { ip: "192.0.2.3" })).status, 401);
  await pool.query('UPDATE "user" SET email=$1 WHERE id=$2', [email, owner.id]);
  checks.push("non-owner existing sessions rejected; non-owner cannot create a session with valid credentials");

  const token = randomBytes(24).toString("base64url");
  const resetPassword = randomBytes(24).toString("base64url");
  await pool.query('INSERT INTO verification (id, identifier, value, "expiresAt") VALUES ($1,$2,$3,now()+interval \'30 minutes\')', [randomUUID(), `reset-password:${token}`, owner.id]);
  const callback = await get(`/reset-password/${token}?callbackURL=${encodeURIComponent(`${base}/cms/reset-password`)}`);
  assert.equal(callback.status, 302);
  assert.equal(new URL(callback.headers.get("location")!).searchParams.get("token"), token);
  const foreign = await get(`/reset-password/${token}?callbackURL=${encodeURIComponent("https://example.test/steal")}`);
  assert.equal(foreign.status, 403);
  assert.equal((await post("/reset-password", { token, newPassword: resetPassword }, { ip: "192.0.2.4" })).status, 200);
  assert.equal(await authModule.getCmsSession(new Headers({ cookie })), null);
  assert.equal((await post("/reset-password", { token, newPassword: resetPassword }, { ip: "192.0.2.4" })).status, 400);
  assert.equal((await post("/sign-in/email", { email, password }, { ip: "192.0.2.5" })).status, 401);
  const resetLogin = await post("/sign-in/email", { email, password: resetPassword }, { ip: "192.0.2.5" });
  assert.equal(resetLogin.status, 200);
  checks.push("password reset token is single-use, rejects foreign callback and revokes previous sessions");

  const resetCookie = cookieFrom(resetLogin);
  assert.equal((await post("/sign-out", {}, { cookie: resetCookie })).status, 200);
  assert.equal(await authModule.getCmsSession(new Headers({ cookie: resetCookie })), null);
  checks.push("sign-out revokes the database session immediately");

  const attempts = await Promise.all(Array.from({ length: 7 }, () => post("/sign-in/email", { email, password: "wrong-password" }, { ip: "192.0.2.200" })));
  assert.equal(attempts.filter((r) => r.status === 401).length, 5);
  assert.equal(attempts.filter((r) => r.status === 429).length, 2);
  const retryAfter = Number(attempts.find((r) => r.status === 429)?.headers.get("Retry-After"));
  assert(retryAfter >= 1 && retryAfter <= 60, "Rate-limit retry duration must fit the configured window.");
  assert((await pool.query('SELECT COUNT(*)::int AS count FROM "rateLimit"')).rows[0].count > 0);
  checks.push("concurrent requests respect five-attempt database rate limit and return Retry-After");

  const bootstrapPassword = randomBytes(24).toString("base64url");
  execFileSync(process.execPath, ["scripts/cms-bootstrap.mjs", "--reset-password"], { env: { ...process.env, CMS_INITIAL_PASSWORD: bootstrapPassword }, stdio: "pipe" });
  const replaced = (await pool.query('SELECT password FROM account WHERE "userId"=$1', [owner.id])).rows[0].password;
  assert(await verifyPassword({ hash: replaced, password: bootstrapPassword }));
  checks.push("explicit bootstrap reset updates only owner credential");
  console.log(JSON.stringify({ ok: true, checks }, null, 2));
} finally {
  await getDb?.().end();
  await pool.end();
  await admin.query(`DROP DATABASE "${databaseName}"`);
  await admin.end();
}
