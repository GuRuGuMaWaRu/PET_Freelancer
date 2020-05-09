const Client = require("../models/clientModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// @route     GET clients/
// @desc      Get all clients
// @access    Private
exports.getAllClients = catchAsync(async (req, res, next) => {
  const clients = await Client.find({ user: req.userId }).sort({
    name: 1
  });
  res.status(200).json({ status: "success", data: { clients } });
});

// @route     GET client/:id
// @desc      Get a particular client
// @access    Private
exports.getClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new AppError("No client found with this ID", 404));
  }

  res.status(200).json({ status: "success", data: { client } });
});

// @route     POST clients/
// @desc      Create client
// @access    Private
exports.createClient = catchAsync(async (req, res, next) => {
  const newClient = await Client.create(req.body);

  res.status(201).json({ status: "success", data: { newClient } });
});
