import type { NextFunction, Request, Response } from "express";
import type { AsyncControllerFn } from "../types/asyncControllerFn.js";

export const asyncHandler =
  (fn: AsyncControllerFn) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
