import { Router } from "express";
import mongoose from "mongoose";
import authRouter from "./auth.js";

const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  const connected = mongoose.connection.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "unavailable",
    database: connected ? "connected" : "disconnected",
  });
});

apiRouter.use("/auth", authRouter);

export default apiRouter;
