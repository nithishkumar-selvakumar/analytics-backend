import { enqueueEventJob } from "./analytics.job.js";
import { CreateEventInput } from "./analytics.schema.js";

export async function createEventService(input: CreateEventInput) {
  await enqueueEventJob(input);
  return { queued: true };
}
