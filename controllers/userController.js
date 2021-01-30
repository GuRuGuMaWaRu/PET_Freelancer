const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

//--> Admin routes

// @route     GET users/
// @desc      Get all users
// @access    Private
const getAllUsers = factory.getAll(User);

// @route     GET users/:id
// @desc      Get user
// @access    Private
const getUser = factory.getOne(User);

// @route     POST users/
// @desc      Create user
// @access    Private
const createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead"
  });
});

// @route     PATCH users/:id
// @desc      Update user
// @access    Private
const updateUser = factory.updateOne(User);

// @route     DELETE users/:id
// @desc      Delete user
// @access    Private
const deleteUser = factory.deleteOne(User);

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
