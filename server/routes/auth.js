import { Router } from "express";
import {
  login,
  loginFan,
  logout,
  me,
  signup,
  signupFan,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/fan/signup", signupFan);
authRouter.post("/fan/login", loginFan);
authRouter.post("/logout", logout);
authRouter.get("/me", me);

export default authRouter;
