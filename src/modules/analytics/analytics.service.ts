import { insertEvent } from "./analytics.repo.js";
import { CreateEventInput } from "./analytics.schema.js";

export async function createEventService(input: CreateEventInput) {
  const event = await insertEvent(input);
  return event;
}
