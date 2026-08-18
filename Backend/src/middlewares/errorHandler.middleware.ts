import type { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
}
