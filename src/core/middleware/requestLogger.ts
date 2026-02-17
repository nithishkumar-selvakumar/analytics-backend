import { Request, NextFunction, Response } from "express";
import { ctxLogger } from "../getLogger.js";
import { getContext } from "../asyncContext.js";

export function requestPerformance(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = performance.now();

  ctxLogger().info(
    {
      startTime: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      requestId: getContext()?.requestId,
    },
    "Request started",
  );

  res.on("finish", () => {
    const duration = performance.now() - start;
    const ctx = getContext();

    const queries = ctx?.dbMetrics?.totalQueries ?? 0;
    const dbTime = ctx?.dbMetrics?.totalQueryTime ?? 0;
    const slowQueries = ctx?.dbMetrics?.slowQueries ?? 0;

    const dbTimePercent =
      duration > 0 ? Number(((dbTime / duration) * 100).toFixed(1)) : 0;

    const appTime = Number(Math.max(duration - dbTime, 0).toFixed(1));

    ctxLogger().info(
      {
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
