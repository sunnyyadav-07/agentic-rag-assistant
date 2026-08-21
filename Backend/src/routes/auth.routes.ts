import { Router } from "express";
import {
  getAccessTokenController,
  getMeController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();
authRouter.post("/register", asyncHandler(registerController));
authRouter.post("/login", asyncHandler(loginController));
authRouter.get(
  "/get-me",
  asyncHandler(authenticateUser),
  asyncHandler(getMeController),
);
authRouter.get("/get-accessToken", asyncHandler(getAccessTokenController));
export default authRouter;
