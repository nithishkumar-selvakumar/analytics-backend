import express, { type Request, type Response } from "express";
import { query } from "./db/query.js";
import { requestPerformance } from "./core/middleware/requestLogger.js";
import { requestId } from "./core/middleware/requestId.js";
import { getMetrics } from "./core/dbMetrics.js";
import { routeName } from "./core/middleware/routeName.js";
import { errorHandler } from "./core/errorHandler.js";
import { asyncHandler } from "./core/asyncHandler.js";

// import routes
import analyticRoute from "./modules/analytics/analytics.route.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(requestId);
  app.use(requestPerformance);

  app.use("/analytics", analyticRoute);

  app.get(
    "/test-slow",
    routeName("slow-query"),
    asyncHandler(async (req: Request, res: Response) => {
      await query("SELECT pg_sleep(20);", [], { queryName: "slow-query" }); // simulate a slow query
      res.send("slow query executed");
    }),
  );

  app.get(
    "/test-fast",
    routeName("fast-query"),
    asyncHandler(async (req: Request, res: Response) => {
      await query("SELECT NOW();", [], { queryName: "fast-query" }); // simulate a fast query
      res.send("fast query executed");
    }),
  );

  app.get("/metrics/db", routeName("db-metrics"), (_req, res) => {
    res.json(getMetrics());
  });

  app.get("/test-multi", routeName("multi-query"), async (_req, res) => {
    for (let i = 0; i < 20; i++) {
      await query("SELECT NOW()", [], { queryName: `multi-query-${i + 1}` }); // simulate multiple queries
    }
    res.send("done");
  });

  app.get(
    "/test-error",
    routeName("test-error"),
    asyncHandler(async (_req, _res) => {
      throw new Error("boom");
    }),
  );

  app.use((req, _res, next) => {
    console.log("PATH HIT:", req.method, req.url);
    next();
  });
  app.use(errorHandler);

  return app;
}
