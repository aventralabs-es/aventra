import pg from "pg";
import { requireEnv } from "./env";

const { Pool } = pg;

export function createDbPool() {
  return new Pool({
    connectionString: requireEnv("DATABASE_URL"),
  });
}

export async function withTransaction<T>(
  pool: pg.Pool,
  callback: (client: pg.PoolClient) => Promise<T>,
) {
  const client = await pool.connect();

  try {
    await client.query("begin");
    const result = await callback(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
