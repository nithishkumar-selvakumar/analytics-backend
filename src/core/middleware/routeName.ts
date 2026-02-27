import { Request, Response, NextFunction } from "express";
import { getContext } from "../asyncContext.js";

export function routeName(name: string) {
  return function (_req: Request, _res: Response, next: NextFunction) {
    const ctx = getContext();
    if (ctx) {
      ctx.routeName = name;
    }
    next();
  };
}
