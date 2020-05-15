const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

//--> Admin routes

// @route     GET users/
// @desc      Get all users
// @access    Private
exports.getAllUsers = factory.getAll(User);

// @route     GET users/:id
// @desc      Get user
// @access    Private
exports.getUser = factory.getOne(User);

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
exports.updateUser = factory.updateOne(User);

// @route     DELETE useres/:id
// @desc      Delete user
// @access    Private
exports.deleteUser = factory.deleteOne(User);
