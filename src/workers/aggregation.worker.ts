import { Worker } from "bullmq";

import { config } from "../core/config.js";
import { logger } from "../core/logger.js";
import {
  incrementDailyCount,
  incrementUserSummary,
} from "../modules/analytics/analytics.aggregation.repo.js";
import { insertEvent } from "../modules/analytics/analytics.repo.js";

new Worker(
  "analytics",
  async (job) => {
    if (job.name === "process-event") {
      const { userId, eventName, value } = job.data;
      logger.info({ jobId: job.id }, "Processing analytics job");
      await insertEvent({ userId, eventName, value });

      await incrementDailyCount(eventName);

      await incrementUserSummary(userId, eventName);
    }
  },
  {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
  },
);
