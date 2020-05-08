const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// @route     POST api/auth
// @desc      Log in user
// @access    Public
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid credentials", 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 400));
  }

  const payload = {
    id: user._id
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({ status: "success", data: { token } });
    }
  );
});

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  // Get new token
  const payload = {
    id: user._id
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({ status: "success", data: { user, token } });
    }
  );
});
