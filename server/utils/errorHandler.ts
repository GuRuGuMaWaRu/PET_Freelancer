import { Request, Response } from "express";
import { AppError } from ".";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
