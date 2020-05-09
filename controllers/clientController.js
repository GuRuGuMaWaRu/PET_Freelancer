const Client = require("../models/clientModel");
const catchAsync = require("../utils/catchAsync");

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
  res.status(200).json({ status: "success", data: { client } });
});
