import express from "express";
const AuthRouter = express.Router();
import {
  signUpController,
  signInController,
} from "../controllers/authController";

// Route for user and doctor signup
AuthRouter.post("/sign-up", signUpController as any);

// Route for user and doctor signin
AuthRouter.post("/sign-in", signInController as any);

export default AuthRouter;
