import {
  getAccessTokenService,
  loginService,
  registerService,
} from "../services/auth.service.js";
import type { AsyncControllerFn } from "../types/asyncControllerFn.js";
import { AppError } from "../utils/AppError.js";

export const registerController: AsyncControllerFn = async (req, res, next) => {
  const { refreshToken, accessToken, newUser } = await registerService(
    req.body,
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const loginController: AsyncControllerFn = async (req, res, next) => {
  const { refreshToken, accessToken, user } = await loginService(req.body);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "User loggedin successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

export const getMeController: AsyncControllerFn = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user: {
      email: user.email,
      name: user.name,
    },
  });
};

export const getAccessTokenController: AsyncControllerFn = async (
  req,
  res,
  next,
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError("Unauthorized request", 401);
  }
  const { accessToken } = await getAccessTokenService(refreshToken);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "Access token generated",
  });
};
