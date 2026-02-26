import { Request, Response, NextFunction } from "express";
import { getContext } from "../asyncContext.js";

export function routeName(name: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const ctx = getContext();
    if (ctx) {
      ctx.routeName = name;
    }
    next();
  };
}
