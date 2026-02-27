import { Router } from "express";

import { createEventController } from "./analytics.controller.js";
import { createEventSchema } from "./analytics.schema.js";
import { asyncHandler } from "../../core/asyncHandler.js";
import { routeName } from "../../core/middleware/routeName.js";
import { validateBody } from "../../core/validate.js";

const router = Router();

router.post(
  "/events",
  routeName("insert-events"),
  validateBody(createEventSchema),
  asyncHandler(createEventController),
);

export default router;
