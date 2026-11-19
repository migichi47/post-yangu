import { Router } from "express";
import { login, me, signup } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", me);

export default authRouter;
