const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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
// @route     DELETE useres/:id
// @desc      Delete user
// @access    Private
exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      deleted: true
    },
    { new: true }
  );

  if (!deletedUser) {
    next(new AppError("No user found with this ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
