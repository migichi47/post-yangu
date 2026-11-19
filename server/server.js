import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { start as startDatabase } from "./config/db.js";

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

const app = express();
app.use(express.json());

app.get("/api/health", (_request, response) => {
  const connected = mongoose.connection.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "unavailable",
    database: connected ? "connected" : "disconnected",
  });
});

async function startServer() {
  await startDatabase();
  const server = await new Promise((resolve, reject) => {
    const listener = app.listen(port, () => resolve(listener));
    listener.once("error", reject);
  });

  console.info(`PostYangu API listening on port ${port}.`);

  const shutdown = async () => {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect();
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

startServer().catch(async (error) => {
  console.error("Failed to start PostYangu API:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
