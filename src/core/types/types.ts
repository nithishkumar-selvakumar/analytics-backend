import { Request } from "express";

export type TypedRequestBody<T> = Request & {
  body: T;
};
