import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import type { JWTPayload } from "../types/user.types.js";
export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
};
export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
