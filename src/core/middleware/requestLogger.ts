import { Request, NextFunction, Response } from "express";
import { ctxLogger } from "../getLogger.js";

export function requestPerformance(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = performance.now();

  res.on("finish", () => {
    const duration = performance.now() - start;

    ctxLogger().info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration,
      },
      "HTTP request",
    );
  });
  next();
}
