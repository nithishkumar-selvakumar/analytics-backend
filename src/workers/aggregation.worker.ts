import { Worker } from "bullmq";
import { config } from "../core/config.js";
import { insertEvent } from "../modules/analytics/analytics.repo.js";
import { logger } from "../core/logger.js";

new Worker(
  "analytics",
  async (job) => {
    if (job.name === "process-event") {
      logger.info({ jobId: job.id }, "Processing analytics job");
      await insertEvent(job.data);
    }
  },
  {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
  },
);
