import userModel from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { config } from "../config/config.js";
import type {
  DecodeJWT,
  LoginBody,
  RegisterBody,
} from "../types/user.types.js";
export const registerService = async (data: RegisterBody) => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }
  const isExisted = await userModel.findOne({ email });
  if (isExisted) {
    throw new AppError("User already exists with this email", 409);
  }
  const newUser = await userModel.create({
    name,
    email,
    password,
  });
  const accessToken = generateAccessToken({ userId: newUser._id.toString() });
  const refreshToken = generateRefreshToken({ userId: newUser._id.toString() });

  newUser.refreshToken = refreshToken;
  await newUser.save();
  return { accessToken, refreshToken, newUser };
};
export const loginService = async (data: LoginBody) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }
  const isExisted = await userModel.findOne({ email });
  if (!isExisted) {
    throw new AppError("Invalid credentials", 404);
  }
  const isPasswordCorrect = isExisted.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 400);
  }
  const accessToken = generateAccessToken({ userId: isExisted._id.toString() });
  const refreshToken = generateRefreshToken({
    userId: isExisted._id.toString(),
  });

  isExisted.refreshToken = refreshToken;
  await isExisted.save();
  return { accessToken, refreshToken, user: isExisted };
};
export const getAccessTokenService = async (refreshToken: string) => {
  const decode = jwt.verify(
    refreshToken,
    config.JWT_REFRESH_SECRET,
  ) as DecodeJWT;
  if (!decode) {
    throw new AppError("Unauthorized request", 401);
  }
  const user = await userModel.findById(decode.id);
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  if (refreshToken !== user.refreshToken?.toString()) {
    throw new AppError("Unauthorized", 401);
  }
  const accessToken = generateAccessToken({ userId: user._id.toString() });
  return {
    accessToken,
  };
};
