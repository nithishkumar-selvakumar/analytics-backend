import express, { type Request, type Response } from "express";
import { query } from "./db/query.js";
import { requestPerformance } from "./core/middleware/requestLogger.js";
import { requestId } from "./core/middleware/requestId.js";
// import routes

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(requestId);
  app.use(requestPerformance);

  app.get("/test-slow", async (req: Request, res: Response) => {
    await query("SELECT pg_sleep(2);", [], { queryName: "slow-query" }); // simulate a slow query
    res.send("slow query executed");
  });

  app.get("/test-fast", async (req: Request, res: Response) => {
    await query("SELECT NOW();", [], { queryName: "fast-query" }); // simulate a fast query
    res.send("fast query executed");
  });

  app.use((req, _res, next) => {
    console.log("PATH HIT:", req.method, req.url);
    next();
  });

  return app;
}
