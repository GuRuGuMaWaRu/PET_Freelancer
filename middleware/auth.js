const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return next(new AppError("No token provided, authorization denied", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    next(new AppError("Token is not valid", 401));
  }
};
