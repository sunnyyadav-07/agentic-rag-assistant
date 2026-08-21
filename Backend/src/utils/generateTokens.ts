import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });
};
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
  });
};
