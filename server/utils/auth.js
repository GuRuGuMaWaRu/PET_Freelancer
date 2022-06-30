const jwt = require("jsonwebtoken");
const { AppError } = require(".");

const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new AppError(401, "No token provided, authorization denied"));
  }

  const token = bearer.split(" ")[1].trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    next(new AppError(401, "Token is not valid"));
  }
};

module.exports = {
  protect
};
