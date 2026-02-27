import { Pool } from "pg";

import { config } from "../core/config.js";
import { logger } from "../core/logger.js";

export const pool = new Pool({
  connectionString: config.db.url,
  max: config.db.poolSize,
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  logger.info("New Postgres client connected");
});

pool.on("error", (err: Error) => {
  logger.error(err, "Unexpected Postgres error");
});
