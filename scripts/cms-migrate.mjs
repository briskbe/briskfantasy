import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import pg from "pg";

if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before running CMS migrations.");
const db = new pg.Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 15_000, application_name: "brisk-cms-migrate" });
try {
  await db.connect();
  // Keep the lock and all migrations in one transaction. Transaction-scoped
  // locks also work through Neon's PgBouncer pool; session locks do not.
  await db.query("BEGIN");
  await db.query("SELECT pg_advisory_xact_lock(629142701)");
  await db.query("CREATE TABLE IF NOT EXISTS cms_migrations (name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())");
  const directory = fileURLToPath(new URL("../migrations/cms/", import.meta.url));
  const messages = [];
  for (const name of (await readdir(directory)).filter((name) => /^\d+.*\.sql$/.test(name)).sort()) {
    const sql = await readFile(`${directory}/${name}`, "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const existing = await db.query("SELECT checksum FROM cms_migrations WHERE name = $1", [name]);
    if (existing.rowCount) {
      if (existing.rows[0].checksum !== checksum) throw new Error(`Applied migration changed: ${name}. Add a new migration instead.`);
      messages.push(`Already applied: ${name}`);
      continue;
    }
    await db.query(sql);
    await db.query("INSERT INTO cms_migrations (name,checksum) VALUES ($1,$2)", [name, checksum]);
    messages.push(`Applied: ${name}`);
  }
  await db.query("COMMIT");
  for (const message of messages) console.log(message);
} catch (error) {
  await db.query("ROLLBACK").catch(() => {});
  console.error(error.message?.startsWith("Applied migration changed:") ? error.message : "CMS migration failed. Check database access and migration validity; connection credentials are never logged.");
  process.exitCode = 1;
} finally {
  await db.end();
}
