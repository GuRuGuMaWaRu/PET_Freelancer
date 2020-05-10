const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// @route     POST users/
// @desc      Register user
// @access    Public
exports.registerUser = catchAsync(async (req, res, next) => {
  // Handle Registration form errors
  const { name, email, password1 } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new AppError("User already exists", 400));
  }
  user = new User({
    name,
    email,
    password: password1
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password1, salt);

  await user.save();

  const payload = {
    id: user._id
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(201).json({ status: "success", token });
    }
  );
});
