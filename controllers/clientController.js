const Client = require("../models/Client");
const catchAsync = require("../utils/catchAsync");

// @route     GET clients/
// @desc      Get all clients
// @access    Private
exports.getAllClients = catchAsync(async (req, res, next) => {
  const clients = await Client.find({ user: req.user.id }).sort({
    name: 1
  });
  res.status(200).json({ status: "success", data: { clients } });
});
