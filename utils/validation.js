const { validationResult } = require("express-validator");
const { AppError } = require(".");

const validateForm = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors.array());
    return next(new AppError(422, "Validation error"));
  }

  next();
};

module.exports = validateForm;
