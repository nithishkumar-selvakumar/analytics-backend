import { config } from "../core/config.js";
import { pool } from "./postgres.js";
import { ctxLogger } from "../core/getLogger.js";

const appStart = Date.now();

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const start = performance.now();
  try {
    const result = await pool.query(text, params);

    const duration = performance.now() - start;
    const isWarmup = Date.now() - appStart < 5000;

    if (!isWarmup && duration > config.db.slowQueryThreshold) {
      ctxLogger().warn(
        { duration, rows: result.rowCount, query: text },
        "Slow query detected",
      );
    } else {
      ctxLogger().debug(
        { duration, rows: result.rowCount, query: text },
        "Query executed",
      );
    }
    return result.rows as T[];
  } catch (error) {
    ctxLogger().error({ error, query: text }, "Database query failed");
    throw error;
  }
}
