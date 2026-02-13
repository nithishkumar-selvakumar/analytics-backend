import pino from "pino";
import { config } from "./config.js";

export const logger = pino({
  level: config.logger.level || "info",
  transport: config.app.isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      }
    : undefined,
});
