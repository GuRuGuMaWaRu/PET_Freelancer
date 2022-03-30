const { validationResult } = require("express-validator");
const { AppError } = require(".");

const validateForm = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors.array());
    return new AppError("Validation error", 422);
  }

  next();
};

module.exports = {
  validateForm
};
