const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// @route     POST users/
// @desc      Register a user
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

//--> Admin routes

// @route     GET users/
// @desc      Get all users
// @access    Private
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res
    .status(200)
    .json({ status: "success", results: users.length, data: { data: users } });
});
// @route     GET users/:id
// @desc      Get user
// @access    Private
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new AppError("No user found with this ID", 404));
  }

  res.status(200).json({ status: "success", data: { data: user } });
});
// @route     POST users/
// @desc      Create user
// @access    Private
exports.createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead"
  });
});
// @route     PATCH users/:id
// @desc      Update user
// @access    Private
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedUser) {
    next(new AppError("No user found with this ID", 404));
  }

  res.status(200).json({ status: "success", data: { data: updatedUser } });
});
