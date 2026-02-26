import { Router } from "express";
import { validateBody } from "../../core/validate.js";
import { asyncHandler } from "../../core/asyncHandler.js";
import { routeName } from "../../core/middleware/routeName.js";
import { createEventController } from "./analytics.controller.js";
import { createEventSchema } from "./analytics.schema.js";

const router = Router();

router.post(
  "/events",
  routeName("insert-events"),
  validateBody(createEventSchema),
  asyncHandler(createEventController),
);

export default router;
