import { config } from "../core/config.js";
import { pool } from "./postgres.js";
import { ctxLogger } from "../core/getLogger.js";

const appStart = Date.now();
type QueryOptions = {
  queryName?: string;
  system?: string;
};

export async function query<T>(
  text: string,
  params?: unknown[],
  options?: QueryOptions,
): Promise<T[]> {
  const start = performance.now();
  try {
    const result = await pool.query(text, params);

    const duration = performance.now() - start;
    const isWarmup = Date.now() - appStart < 5000;

    if (!isWarmup && duration > config.db.slowQueryThreshold) {
      ctxLogger().warn(
        {
          queryName: options?.queryName ?? "anonymous",
          duration,
          rows: result.rowCount,
          query: text,
        },
        "Slow query detected",
      );
    } else {
      ctxLogger().debug(
        {
          queryName: options?.queryName ?? "anonymous",
          duration,
          rows: result.rowCount,
          query: text,
        },
        "Query executed",
      );
    }
    return result.rows as T[];
  } catch (error) {
    ctxLogger().error(
      { queryName: options?.queryName ?? "anonymous", error, query: text },
      "Database query failed",
    );
    throw error;
  }
}
