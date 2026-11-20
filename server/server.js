
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

let initializationPromise;
let sessionMiddleware;

async function initialize() {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await startDatabase();

      if (process.env.NODE_ENV === "production") {
        app.set("trust proxy", 1);
      }

      sessionMiddleware = session({
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
      });
    })().catch((error) => {
      initializationPromise = null;
      throw error;
    });
  }

  return initializationPromise;
}

// Initialize database and sessions before processing API requests.
app.use(async (req, res, next) => {
  try {
    await initialize();
    sessionMiddleware(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use("/api", apiRouter);

// Error handler
app.use((error, req, res, next) => {
  console.error("API error:", error);

  res.status(500).json({
    message: "An internal server error occurred.",
  });
});

// Local development server only
if (process.env.VERCEL !== "1") {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  initialize()
    .then(() => {
      app.listen(port, () => {
        console.info(`PostYangu API listening on port ${port}.`);
      });
    })
    .catch((error) => {
      console.error("Failed to start PostYangu API:", error);
      process.exitCode = 1;
    });
}

export default app;
