import { NextFunction, Request, Response } from "express";
import { UserError } from "../../domain/users/errors/user.errors";

export const errorMiddleware = (
  error: Error & Partial<UserError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const resMessage = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).json({ message: resMessage });
};
