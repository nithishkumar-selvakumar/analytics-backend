import { Request, Response, NextFunction } from "express";
import { getContext } from "./asyncContext.js";
import { ctxLogger } from "./getLogger.js";
import { AppError } from "./error.js";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const ctx = getContext();
  const log = ctxLogger();

  if (err instanceof AppError) {
    log.warn(
      {
        requestId: ctx?.requestId,
        routeName: ctx?.routeName,
        statusCode: err.statusCode,
        message: err.message,
      },
      "Operational error",
    );

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  log.error(
    {
      requestId: ctx?.requestId,
      routeName: ctx?.routeName,
      err: err,
    },
    "Unhandled error",
  );

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
