import { Request, NextFunction, Response } from "express";

import { getContext } from "../asyncContext.js";
import { ctxLogger } from "../getLogger.js";

export function requestPerformance(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = performance.now();
  const ctxStart = getContext();
  const log = ctxStart?.logger || ctxLogger();

  log.info(
    {
      startTime: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      routeName: ctxStart?.routeName || "unknown",
    },
    "Request started",
  );

  res.on("finish", () => {
    const ctx = getContext();
    const duration = performance.now() - start;
    const queries = ctx?.dbMetrics?.totalQueries ?? 0;
    const dbTime = ctx?.dbMetrics?.totalQueryTime ?? 0;
    const slowQueries = ctx?.dbMetrics?.slowQueries ?? 0;

    const dbTimePercent =
      duration > 0 ? Number(((dbTime / duration) * 100).toFixed(1)) : 0;

    const appTime = Number(Math.max(duration - dbTime, 0).toFixed(1));

    log.info(
      {
        routeName: ctx?.routeName,
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration,
        queries,
        dbTime,
        slowQueries,
        dbTimePercent,
        appTime,
      },
      "HTTP request",
    );
  });
  next();
}
