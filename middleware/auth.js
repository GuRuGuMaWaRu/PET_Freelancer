const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

module.exports = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return next(new AppError("No token provided, authorization denied", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (err) {
    next(new AppError("Token is not valid", 401));
  }
};
