import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Implementation steps:
// 1. Load .env
// 2. Validate values
// 3. Export typed config

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(9000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  LOG_LEVEL: z.string().default("info"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    { errors: z.treeifyError(parsed.error) },
    "Environment validation failed",
  );
}

export const env = parsed.data;
