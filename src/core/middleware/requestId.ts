import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { logger } from "../logger.js";
import { asyncContext } from "../asyncContext.js";

export function requestId(_req: Request, res: Response, next: NextFunction) {
  const id = randomUUID();

  const childLogger = logger.child({ requestId: id });

  res.setHeader("x-request-id", id);

  asyncContext.run(
    {
      requestId: id,
      logger: childLogger,
      dbMetrics: {
        totalQueries: 0,
        slowQueries: 0,
        totalQueryTime: 0,
      },
    },
    () => {
      next();
    },
  );
}
