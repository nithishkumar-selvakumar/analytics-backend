import { analyticsQueue } from "./analytics.queue.js";
import { CreateEventInput } from "./analytics.schema.js";

export async function enqueueEventJob(data: CreateEventInput) {
  await analyticsQueue.add("process-event", data, {
    removeOnComplete: true,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
}
