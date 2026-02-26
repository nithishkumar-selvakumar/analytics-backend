import { z } from "zod";

export const createEventSchema = z.object({
  userId: z.string().min(1),
  eventName: z.string().min(1),
  value: z.number().optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
