import type { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";
import { AppError } from ".";

export const validateForm = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors.array());
    return new AppError(422, "Validation error");
  }

  next();
};
