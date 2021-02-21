const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");
const User = require("../resources/user/user.model");

const newToken = payload => {
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const signUp = async (req, res, next) => {
  // Handle Registration form errors
  const { name, email, password1 } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return next(new AppError("User already exists", 400));
    }

    user = await User.create({
      name,
      email,
      password: password1
    });

    const payload = {
      id: user._id
    };

    const token = newToken(payload);

    res.status(201).json({ status: "success", token });
  } catch (err) {
    next(err);
  }
};

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
  signUp,
  protect
};
