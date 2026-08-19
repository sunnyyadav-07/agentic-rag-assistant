import type { NextFunction, Request, Response } from "express";

type AsyncControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const asyncHandler =
  (fn: AsyncControllerFn) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
