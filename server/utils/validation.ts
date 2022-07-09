import { validationResult } from "express-validator";
import { AppError } from ".";

export const validateForm = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors.array());
    return new AppError(422, "Validation error");
  }

  next();
};
