import {
  getAccessTokenService,
  loginService,
  registerService,
} from "../services/auth.service.js";
import type { AsyncControllerFn } from "../types/asyncControllerFn.js";
import { sendResponse } from "../utils/sendResponse.js";
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
  sendResponse(res, 201, true, "User registered successfully", {
    email: newUser.email,
    name: newUser.name,
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
  sendResponse(res, 200, true, "User loggedIn successfully", {
    email: user.email,
    name: user.name,
  });
};

export const getMeController: AsyncControllerFn = async (req, res, next) => {
  const user = req.user;
  sendResponse(res, 200, true, "User fetched successfully", {
    email: user.email,
    name: user.name,
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
  sendResponse(res, 200, true, "Access token generated");
};
