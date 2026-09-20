/** Run cms-migrate first. Never prints credentials or resets an existing owner implicitly. */
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { Pool } from "pg";
import { z } from "zod";

async function bootstrap() {
  const args = process.argv.slice(2);
  if (args.some((arg) => arg !== "--reset-password")) throw new Error("Usage: node scripts/cms-bootstrap.mjs [--reset-password]");
  const connectionString = process.env.DATABASE_URL;
  const email = (process.env.CMS_OWNER_EMAIL || "info@brisk.be").trim().toLowerCase();
  if (!connectionString) throw new Error("DATABASE_URL is required. Run the CMS migrations before bootstrapping.");
  if (!z.email().safeParse(email).success) throw new Error("CMS_OWNER_EMAIL must be a valid email address.");
  const password = process.env.CMS_INITIAL_PASSWORD;
  const reset = args.includes("--reset-password");
  const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 10_000 });
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    // Serializes concurrent setup attempts without storing plaintext credentials.
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [`brisk-cms-owner:${email}`]);
    const existing = await client.query('SELECT id FROM "user" WHERE lower(email) = $1 FOR UPDATE', [email]);
    if (existing.rows[0] && !reset) {
      await client.query("COMMIT");
      console.log("CMS owner already exists; credentials were not changed.");
      return;
    }
    if (!password || password.length < 8 || password.length > 128) throw new Error("CMS_INITIAL_PASSWORD must contain 8–128 characters.");
    const passwordHash = await hashPassword(password);
    const userId = existing.rows[0]?.id || randomUUID();
    if (!existing.rows[0]) {
      await client.query('INSERT INTO "user" (id, name, email, "emailVerified") VALUES ($1, $2, $3, true)', [userId, "BRISK", email]);
    }
    await client.query(`INSERT INTO "account" (id, "accountId", "providerId", "userId", password)
      VALUES ($1, $2, 'credential', $2, $3)
      ON CONFLICT ("providerId", "accountId") DO UPDATE SET password = EXCLUDED.password, "updatedAt" = now()`, [randomUUID(), userId, passwordHash]);
    if (existing.rows[0]) {
      await client.query('DELETE FROM "session" WHERE "userId" = $1', [userId]);
      await client.query('DELETE FROM "verification" WHERE value = $1 AND identifier LIKE $2', [userId, "reset-password:%"]);
    }
    await client.query("COMMIT");
    console.log(existing.rows[0] ? "CMS owner password updated; existing sessions and reset links revoked." : "CMS owner created. Public registration remains disabled.");
  } catch (error) {
    if (client) await client.query("ROLLBACK").catch(() => {});
    // Only our validation messages are safe to show; database failures can contain credentials.
    if (error instanceof Error && /^CMS_INITIAL_PASSWORD /.test(error.message)) throw error;
    throw new Error("CMS bootstrap failed. Check database access and apply the CMS migrations first.");
  } finally {
    client?.release();
    await pool.end();
  }
}

bootstrap().catch((error) => {
  console.error(error instanceof Error ? error.message : "CMS bootstrap failed.");
  process.exitCode = 1;
});
