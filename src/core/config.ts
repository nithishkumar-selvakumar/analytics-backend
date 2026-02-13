import { env } from "./env.js";

export const config = {
  app: {
    name: "analytics-backend",
    env: env?.NODE_ENV,
    port: env?.PORT,
    isDev: env?.NODE_ENV === "development",
    isProd: env?.NODE_ENV === "production",
  },
  db: {
    url: env?.DATABASE_URL,
    poolSize: 10, // because of neon  the poolsize will be 10 by default, you can adjust it based on your needs
    statementTimeout: 5000, // ms (server-side timeout)
    slowQueryThreshold: 200, // ms (log if slower)
  },
  redis: {
    url: env?.REDIS_URL,
  },
  logger: {
    level: env?.LOG_LEVEL,
  },
} as const; // 'as const' makes the entire config object deeply readonly and preserves literal types
