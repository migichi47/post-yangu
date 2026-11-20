import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import mongoose from "mongoose";
import { start as startDatabase } from "./config/db.js";
import apiRouter from "./routes/index.js";

const port = Number(process.env.PORT ?? 3000);
const sessionSecret = process.env.SESSION_SECRET;
const sessionDurationMs = 60 * 60 * 1000;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

if (!sessionSecret) {
  throw new Error("SESSION_SECRET is required.");
}

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));

async function startServer() {
  await startDatabase();
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(
    session({
      name: "postyangu.sid",
      secret: sessionSecret,
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: "sessions",
        ttl: sessionDurationMs / 1000,
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: sessionDurationMs,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      },
    }),
  );
  app.use("/api", apiRouter);

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

export default app;
