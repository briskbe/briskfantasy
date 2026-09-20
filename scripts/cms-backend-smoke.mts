// Isolated integration suite. Creates and drops its own database using TEST_DATABASE_URL.
// Run: node --env-file=.env.local --import ./scripts/cms-test-loader.mjs --import tsx scripts/cms-backend-smoke.mts
import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { Pool } from "pg";

if (!process.env.TEST_DATABASE_URL) throw new Error("Set TEST_DATABASE_URL to an isolated PostgreSQL test server.");
if (!["localhost", "127.0.0.1", "[::1]"].includes(new URL(process.env.TEST_DATABASE_URL).hostname)) throw new Error("This destructive test suite only runs on a local PostgreSQL server.");
const admin = new Pool({ connectionString: process.env.TEST_DATABASE_URL, max: 1 });
const databaseName = `cms_backend_test_${Date.now()}_${randomBytes(4).toString("hex")}`;
const url = new URL(process.env.TEST_DATABASE_URL);
await admin.query(`CREATE DATABASE "${databaseName}"`);
url.pathname = `/${databaseName}`;
process.env.DATABASE_URL = url.href;
process.env.BETTER_AUTH_SECRET = randomBytes(48).toString("hex");
process.env.CMS_OWNER_EMAIL = "cms-owner@example.test";
process.env.CMS_INITIAL_PASSWORD = randomBytes(24).toString("base64url");
process.env.BETTER_AUTH_URL = "http://localhost:3002";
Object.assign(process.env, { NODE_ENV: "development" });
delete process.env.VERCEL;
delete process.env.RESEND_API_KEY;
const origin = process.env.BETTER_AUTH_URL;
let pool: Pool | undefined;
try {
  // Two release jobs must serialize schema creation through the transaction lock.
  await Promise.all(Array.from({ length: 2 }, () => promisify(execFile)(process.execPath, ["scripts/cms-migrate.mjs"], { env: process.env })));
  execFileSync(process.execPath, ["scripts/cms-migrate.mjs"], { stdio: "pipe", env: process.env });
  execFileSync(process.execPath, ["scripts/cms-bootstrap.mjs"], { stdio: "pipe", env: process.env });
  const data = await import("../src/lib/cms/data");
  const { getDb } = await import("../src/lib/cms/db");
  const { CmsError } = await import("../src/lib/cms/errors");
  const { validate, quoteSchema } = await import("../src/lib/cms/validation");
  const { quoteTotals } = await import("../src/lib/cms/quote-math");
  const authRoute = await import("../src/app/api/auth/[...all]/route");
  pool = getDb();
  const request = (path: string, method = "GET", body?: unknown, cookie?: string, requestOrigin = origin) => new Request(origin + path, {
    method, headers: { origin: requestOrigin, "content-type": "application/json", ...(cookie ? { cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const login = await authRoute.POST(request("/api/auth/sign-in/email", "POST", { email: process.env.CMS_OWNER_EMAIL, password: process.env.CMS_INITIAL_PASSWORD }));
  assert.equal(login.status, 200);
  const cookie = login.headers.getSetCookie().map((item) => item.split(";")[0]).join("; ");
  const dataRoute = await import("../src/app/api/cms/data/route");
  assert.equal((await dataRoute.GET(request("/api/cms/data"))).status, 401);
  const initial = await (await dataRoute.GET(request("/api/cms/data", "GET", undefined, cookie))).json();
  for (const key of ["clients", "projects", "followUps", "quotes", "activity"]) assert.deepEqual(initial[key], []);
  assert.equal(initial.user.email, process.env.CMS_OWNER_EMAIL);
  console.log("PASS: migrations are repeatable; a real owner session is required; new workspace is genuinely empty.");

  const clientInput = { name: "Test client", company: "Example", email: "client@example.test", phone: "+3200000000", vatNumber: "TEST", address: "Test street", notes: "PRIVATE NOTE MUST NEVER LEAK", status: "active" as const };
  const clientsRoute = await import("../src/app/api/cms/clients/route");
  assert.equal((await clientsRoute.POST(request("/api/cms/clients", "POST", clientInput))).status, 401);
  assert.equal((await clientsRoute.POST(request("/api/cms/clients", "POST", clientInput, cookie, "https://other.example"))).status, 403);
  const created = await clientsRoute.POST(request("/api/cms/clients", "POST", clientInput, cookie));
  assert.equal(created.status, 201);
  assert.match(created.headers.get("cache-control")!, /no-store/);
  const client = await created.json();
  await assert.rejects(data.createClient({ ...clientInput, email: "not-an-email" }), (error) => error instanceof CmsError && error.status === 422);
  await assert.rejects(data.createClient({ ...clientInput, id: randomUUID() }), (error) => error instanceof CmsError && error.status === 422);
  assert.equal((await data.updateClient(client.id, { status: "archived" })).status, "archived");
  await data.updateClient(client.id, { status: "active" });
  const projectInput = { clientId: client.id, title: "Project", description: "Description", status: "planned" as const, service: "Website", budgetCents: 100_000, startDate: "2026-01-01", dueDate: "2026-02-01", progress: 0 };
  const project = await data.createProject(projectInput);
  await assert.rejects(data.updateProject(project.id, { startDate: "2026-03-01" }), (error) => error instanceof CmsError && error.status === 422);
  await assert.rejects(data.createProject({ ...projectInput, clientId: randomUUID() }), (error) => error instanceof CmsError && error.status === 422);
  const followUp = await data.createFollowUp({ clientId: null, projectId: project.id, title: "Call client", notes: "Private", dueAt: "2030-01-01T09:00:00+01:00", status: "open", priority: "high", type: "call" });
  assert.equal(followUp.clientId, client.id);
  assert.equal(followUp.dueAt, "2030-01-01T08:00:00.000Z");
  assert.equal((await data.updateFollowUp(followUp.id, { status: "done" })).status, "done");
  const otherClient = await data.createClient({ ...clientInput, name: "Other client" });
  await assert.rejects(data.updateProject(project.id, { clientId: otherClient.id }), (error) => error instanceof CmsError && error.status === 409);
  await assert.rejects(data.updateFollowUp(followUp.id, { clientId: otherClient.id }), (error) => error instanceof CmsError && error.status === 422);
  await data.deleteFollowUp(followUp.id);
  assert.deepEqual((await pool.query("SELECT id FROM cms_follow_ups")).rows, []);
  console.log("PASS: client/project/follow-up CRUD, archival, foreign keys, partial-update dates, linked-client consistency, origin enforcement.");

  const item = { id: randomUUID(), description: "Design", quantity: 2.5, unitPriceCents: 1999, vatRate: 21 };
  assert.deepEqual(quoteTotals([item], 0), { subtotalCents: 4998, vatCents: 1050, totalCents: 6048 });
  assert.deepEqual(quoteTotals([{ ...item, quantity: 1, unitPriceCents: 1000, vatRate: 21 }, { ...item, id: randomUUID(), quantity: 1, unitPriceCents: 1000, vatRate: 6 }], 101), { subtotalCents: 2000, vatCents: 256, totalCents: 2155 });
  assert.deepEqual(quoteTotals([{ ...item, quantity: 0.001, unitPriceCents: 500, vatRate: 0 }], 0), { subtotalCents: 1, vatCents: 0, totalCents: 1 });
  assert.deepEqual(quoteTotals([item], 4998), { subtotalCents: 4998, vatCents: 0, totalCents: 0 });
  const today = new Date().toISOString().slice(0, 10);
  const future = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  const quoteInput = { clientId: client.id, title: "Quote", issueDate: today, validUntil: future, introduction: "Proposed work", terms: "Payment within 14 days.", items: [item], discountCents: 0 };
  assert.throws(() => validate(quoteSchema, { ...quoteInput, issueDate: "2026-02-30" }), CmsError);
  assert.throws(() => validate(quoteSchema, { ...quoteInput, items: [{ ...item, quantity: 1.0001 }] }), CmsError);
  assert.throws(() => validate(quoteSchema, { ...quoteInput, items: [{ ...item, quantity: 1e-10 }] }), CmsError);
  assert.throws(() => quoteTotals([item], 4999), CmsError);
  assert.throws(() => quoteTotals([{ ...item, unitPriceCents: 100_000_000_000, quantity: 100_000 }], 0), CmsError);
  await assert.rejects(data.createQuote({ ...quoteInput, totalCents: 1 }), CmsError);
  const quotes = await Promise.all(Array.from({ length: 5 }, () => data.createQuote(quoteInput)));
  assert.equal(new Set(quotes.map((quote) => quote.number)).size, 5);
  assert.equal(quotes[0].totalCents, 6048);
  const quote = await data.updateQuote(quotes[0].id, { discountCents: 100 });
  assert.equal(quote.subtotalCents, 4998);
  console.log("PASS: exact decimal quantity rounding, mixed VAT discount allocation, amount/date validation and concurrent unique quote numbers.");

  const shared = await data.shareQuote(quote.id);
  assert.match(shared.shareToken!, /^[A-Za-z0-9_-]{43}$/);
  assert.equal((await data.shareQuote(quote.id)).shareToken, shared.shareToken);
  await data.updateClient(client.id, { name: "New private name", notes: "A DIFFERENT PRIVATE NOTE" });
  const visible = await data.getPublicQuote(shared.shareToken!);
  assert.equal(visible?.clientSnapshot?.name, "Test client");
  assert(visible?.viewedAt);
  for (const hidden of ["shareToken", "clientId", "acceptedEmail", "notes", "response_ip_hash"]) assert(!(hidden in visible!));
  assert(!JSON.stringify(visible).includes("PRIVATE NOTE"));
  await assert.rejects(data.updateQuote(shared.id, { title: "Changed after sharing" }), (error) => error instanceof CmsError && error.status === 409);
  const revoked = await data.revokeQuote(shared.id);
  assert.equal(revoked.status, "draft");
  assert.equal(await data.getPublicQuote(shared.shareToken!), null);
  const reshared = await data.shareQuote(shared.id);
  assert.notEqual(reshared.shareToken, shared.shareToken);
  assert.equal(reshared.clientSnapshot?.name, "New private name");
  assert.equal(await data.getPublicQuote("not-a-token"), null);
  const signer = { name: "Client signer", email: "signer@example.test", consent: true };
  await assert.rejects(data.respondToQuote(reshared.shareToken!, { ...signer, decision: "accepted", consent: false }, "test-hash"), CmsError);
  const accepted = await data.respondToQuote(reshared.shareToken!, { ...signer, decision: "accepted" }, "test-hash");
  assert.equal(accepted.status, "accepted");
  assert(accepted.acceptedAt);
  assert.equal(accepted.acceptedName, signer.name);
  assert(!("acceptedEmail" in accepted));
  await assert.rejects(data.respondToQuote(reshared.shareToken!, { ...signer, decision: "declined" }, "test-hash"), (error) => error instanceof CmsError && error.status === 409);
  await assert.rejects(data.revokeQuote(reshared.id), (error) => error instanceof CmsError && error.status === 409);
  await assert.rejects(data.updateQuote(reshared.id, { title: "Changed acceptance" }), (error) => error instanceof CmsError && error.status === 409);
  const duplicated = await data.duplicateQuote(reshared.id);
  assert.equal(duplicated.status, "draft");
  assert.equal(duplicated.shareToken, null);
  assert.equal(duplicated.clientSnapshot, null);
  assert.notEqual(duplicated.number, reshared.number);
  assert.notEqual(duplicated.items[0].id, reshared.items[0].id);
  console.log("PASS: secure idempotent share, frozen public snapshot, no private fields, token revocation/rotation, consent, immutable acceptance and clean duplication.");

  const race = await data.shareQuote(quotes[1].id);
  const responses = await Promise.allSettled([
    data.respondToQuote(race.shareToken!, { ...signer, decision: "accepted" }, "test-hash"),
    data.respondToQuote(race.shareToken!, { ...signer, decision: "declined" }, "test-hash"),
  ]);
  assert.equal(responses.filter((result) => result.status === "fulfilled").length, 1);
  assert.equal(responses.filter((result) => result.status === "rejected" && result.reason.status === 409).length, 1);
  const expires = await data.shareQuote(quotes[2].id);
  await pool.query("UPDATE cms_quotes SET issue_date='2000-01-01',valid_until='2000-01-02' WHERE id=$1", [expires.id]);
  assert.equal(await data.getPublicQuote(expires.shareToken!), null);
  await assert.rejects(data.respondToQuote(expires.shareToken!, { ...signer, decision: "accepted" }, "test-hash"), (error) => error instanceof CmsError && error.status === 410);
  const rateResults = await Promise.allSettled(Array.from({ length: 8 }, () => data.consumeRateLimit("integration-test", 5, 60)));
  assert.equal(rateResults.filter((result) => result.status === "fulfilled").length, 5);
  assert.equal(rateResults.filter((result) => result.status === "rejected" && result.reason.status === 429).length, 3);
  await pool.query("UPDATE cms_rate_limits SET window_start=now()-interval '2 minutes' WHERE key='integration-test'");
  await data.consumeRateLimit("integration-test", 5, 60);
  console.log("PASS: exactly one concurrent quote response, enforced expiry, atomic durable rate limit and window reset.");

  // Each private endpoint independently rejects unauthenticated and cross-origin callers.
  const privateEndpoints = [
    ["clients", "POST"], ["clients/[id]", "PATCH"], ["projects", "POST"], ["projects/[id]", "PATCH"],
    ["follow-ups", "POST"], ["follow-ups/[id]", "PATCH"], ["follow-ups/[id]", "DELETE"],
    ["quotes", "POST"], ["quotes/[id]", "PATCH"], ["quotes/[id]/share", "POST"],
    ["quotes/[id]/revoke", "POST"], ["quotes/[id]/duplicate", "POST"],
  ];
  for (const [path, method] of privateEndpoints) {
    const module = await import(`../src/app/api/cms/${path}/route`);
    const routePath = `/api/cms/${path.replace("[id]", quote.id)}`;
    const context = { params: Promise.resolve({ id: quote.id }) };
    assert.equal((await module[method](request(routePath, method, {}), context)).status, 401, `${path} anonymous`);
    assert.equal((await module[method](request(routePath, method, {}, cookie, "https://other.example"), context)).status, 403, `${path} cross-origin`);
  }
  const publicRoute = await import("../src/app/api/quotes/[token]/route");
  const publicResponse = await publicRoute.GET(request(`/api/quotes/${reshared.shareToken}`), { params: Promise.resolve({ token: reshared.shareToken! }) });
  assert.equal(publicResponse.status, 200);
  assert.match(publicResponse.headers.get("x-robots-tag")!, /noindex/);
  assert.equal(publicResponse.headers.get("referrer-policy"), "no-referrer");
  assert(!("shareToken" in await publicResponse.json()));
  const respondRoute = await import("../src/app/api/quotes/[token]/respond/route");
  const context = { params: Promise.resolve({ token: reshared.shareToken! }) };
  assert.equal((await respondRoute.POST(request(`/api/quotes/${reshared.shareToken}/respond`, "POST", { ...signer, decision: "accepted" }, undefined, "https://other.example"), context)).status, 403);
  const finalData = await (await dataRoute.GET(request("/api/cms/data", "GET", undefined, cookie))).json();
  assert(finalData.activity.length > 0);
  assert(finalData.quotes.some((entry: { status: string }) => entry.status === "accepted"));
  await authRoute.POST(request("/api/auth/sign-out", "POST", {}, cookie));
  assert.equal((await dataRoute.GET(request("/api/cms/data", "GET", undefined, cookie))).status, 401);
  console.log("PASS: every private endpoint rechecks sessions and origin; public API hides secrets; signout immediately revokes data access.");
} finally {
  await pool?.end();
  await admin.query(`DROP DATABASE IF EXISTS "${databaseName}" WITH (FORCE)`);
  await admin.end();
}
