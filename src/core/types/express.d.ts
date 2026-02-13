import "express";
import pino from "pino";

declare module "express-serve-static-core" {
  interface Request {
    id?: string;
    log?: pino.Logger;
  }
}
