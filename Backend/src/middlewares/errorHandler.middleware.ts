import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
}
