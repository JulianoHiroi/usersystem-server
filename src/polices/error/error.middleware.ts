import { NextFunction, Request, Response } from "express";
import UserError from "../../domain/users/errors/user.errors";
import { TokenError } from "../../providers/token/errors/token.error";
import { HashError } from "../../providers/hash/errors/hash.error";
export const errorMiddleware = (
  error: Error & Partial<UserError> & Partial<TokenError> & Partial<HashError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  const statusCode = error.statusCode ?? 500;
  const resMessage = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).json({ message: resMessage });
};
