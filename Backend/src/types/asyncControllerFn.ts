import type { NextFunction, Response, Request } from "express";

export type AsyncControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
