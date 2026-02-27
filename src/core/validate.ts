import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

import { AppError } from "./error.js";

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message =
        result.error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ") || "Invalid request body";

      throw new AppError(message, 400);
    }

    req.body = result.data;
    next();
  };
}
