import { Response } from "express";
import { createEventService } from "./analytics.service.js";
import { TypedRequestBody } from "../../core/types/types.js";
import { CreateEventInput } from "./analytics.schema.js";
export async function createEventController(
  req: TypedRequestBody<CreateEventInput>,
  res: Response,
) {
  const event = await createEventService(req.body);

  res.status(201).json({
    status: "success",
    data: event,
  });
}
