import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { logger } from "../logger.js";
import { asyncContext } from "../asyncContext.js";

export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = randomUUID();

  const childLogger = logger.child({ requestId: id });

  res.setHeader("x-request-id", id);

  asyncContext.run({ requestId: id, logger: childLogger }, () => {
    next();
  });
}
