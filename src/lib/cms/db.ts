import "server-only";
import { Pool, type PoolClient } from "pg";
import { CmsUnavailableError } from "./errors";

export { CmsUnavailableError } from "./errors";

const globalDb = globalThis as typeof globalThis & { briskCmsPool?: Pool };

/** Construct lazily: static marketing pages must build without database secrets. */
export function getDb(): Pool {
  if (!process.env.DATABASE_URL) throw new CmsUnavailableError();
  if (!globalDb.briskCmsPool) {
    globalDb.briskCmsPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
      statement_timeout: 15_000,
      application_name: "brisk-cms",
    });
    // Never log connection strings, SQL parameters, or private records.
    globalDb.briskCmsPool.on("error", () => console.error("[cms] Database connection unavailable."));
  }
  return globalDb.briskCmsPool;
}

export async function transaction<T>(run: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const result = await run(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}
