import { config } from "../core/config.js";
import { pool } from "./postgres.js";
import { ctxLogger } from "../core/getLogger.js";
import { recordQuery } from "../core/dbMetrics.js";
import { getContext } from "../core/asyncContext.js";

const appStart = Date.now();

type QueryOptions = {
  queryName?: string;
  system?: boolean;
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
    const isSlow = !isWarmup && duration > config.db.slowQueryThreshold;
    const ctx = getContext();

    if (ctx?.dbMetrics) {
      ctx.dbMetrics!.totalQueries += 1;
      ctx.dbMetrics!.totalQueryTime += duration;
      if (isSlow) {
        ctx.dbMetrics!.slowQueries += 1;
      }
    }
    recordQuery(duration, isSlow);
    if (duration > config.db.longQueryThreshold) {
      ctxLogger().error(
        {
          routeName: ctx?.routeName,
          queryName: options?.queryName ?? "anonymous",
          duration,
          rows: result.rowCount,
          query: text,
        },
        "Long query detected",
      );
    } else if (isSlow) {
      ctxLogger().warn(
        {
          routeName: ctx?.routeName,
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
          routeName: ctx?.routeName,
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
      {
        routeName: getContext()?.routeName,
        queryName: options?.queryName ?? "anonymous",
        error,
        query: text,
      },
      "Database query failed",
    );
    throw error;
  }
}
