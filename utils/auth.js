const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");

const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new AppError("No token provided, authorization denied", 401));
  }

  const token = bearer.split(" ")[1].trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    next(new AppError("Token is not valid", 401));
  }
};

module.exports = {
  protect
};
