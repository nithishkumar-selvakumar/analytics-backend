import { getContext } from "./asyncContext.js";
import { logger } from "./logger.js";

export const ctxLogger = () => {
  return getContext()?.logger ?? logger;
};
