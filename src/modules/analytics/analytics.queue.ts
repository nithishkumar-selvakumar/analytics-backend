import { Queue } from "bullmq";

import { config } from "../../core/config.js";

export const analyticsQueue = new Queue("analytics", {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
  },
});
