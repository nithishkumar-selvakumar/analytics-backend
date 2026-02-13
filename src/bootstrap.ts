import { createApp } from "./app.js";
import { logger } from "./core/logger.js";
import { pool } from "./db/postgres.js";
import { config } from "./core/config.js";
export async function bootstrap() {
  logger.info("Starting analytics backend...");

  // 1. connect to db
  await pool.connect().then(() => {
    logger.info("Connected to Postgres database");
  });
  // 2. connect to redis( future)

  // 3. create app
  const app = createApp();

  // 4. start server
  const PORT = config.app.port || 8000;
  const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  const shutdown = async () => {
    logger.info("Shutting down server...");
    //  await pool.end();
    server.close(() => {
      logger.info("HTTP server closed.");
      process.exit(0); // exit with success code
    });
  };
  process.on("SIGINT", shutdown); //  signal interrupt (Ctrl+C)
  process.on("SIGTERM", shutdown); // termination signal (e.g., from Docker or Kubernetes)
}
