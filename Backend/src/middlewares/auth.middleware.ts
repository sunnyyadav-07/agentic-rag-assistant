import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import type { AsyncControllerFn } from "../types/asyncControllerFn.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";

export const authenticateUser: AsyncControllerFn = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new AppError("Unauthorized request", 401);
  }
  const decode = jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
  if (!decode) {
    throw new AppError("Unauthorized request", 401);
  }
  const user = await userModel.findById(decode.id);
  if (!user) {
    throw new AppError("User no longer exists", 401);
  }
  req.user = user;
  next();
};
