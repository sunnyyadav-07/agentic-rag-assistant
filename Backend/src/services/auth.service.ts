import userModel from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { config } from "../config/config.js";
type Data = {
  name?: string;
  email: string;
  password: string;
};
export const registerService = async (data: Data) => {
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
  const accessToken = generateAccessToken(newUser._id.toString());
  const refreshToken = generateRefreshToken(newUser._id.toString());

  newUser.refreshToken = refreshToken;
  await newUser.save();
  return { accessToken, refreshToken, newUser };
};
export const loginService = async (data: Data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }
  const isExisted = await userModel.findOne({ email });
  if (!isExisted) {
    throw new AppError("Invalid credentials", 404);
  }
  const isPasswordCorrect = await isExisted.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 400);
  }
  const accessToken = generateAccessToken(isExisted._id.toString());
  const refreshToken = generateRefreshToken(isExisted._id.toString());

  isExisted.refreshToken = refreshToken;
  await isExisted.save();
  return { accessToken, refreshToken, user: isExisted };
};
export const getAccessTokenService = async (refreshToken: string) => {
  const decode = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
  if (!decode) {
    throw new AppError("Unauthorized request", 401);
  }
  const user = await userModel.findById(decode.id)
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  if (refreshToken !== user.refreshToken?.toString()) {
    throw new AppError("Unauthorized", 401);
  }
  const accessToken = generateAccessToken(user._id.toString());
  return {
    accessToken,
  };
};
