const Client = require("../models/clientModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

// @route     GET clients/
// @desc      Get all clients
// @access    Private
exports.getAllClients = factory.getAll(Client);

// @route     GET clients/:id
// @desc      Get client
// @access    Private
exports.getClient = factory.getOne(Client);

// @route     POST clients/
// @desc      Create client
// @access    Private
exports.createClient = catchAsync(async (req, res, next) => {
  const newClient = await Client.create(req.body);

  res.status(201).json({ status: "success", data: { data: newClient } });
});

// @route     PATCH clients/:id
// @desc      Update client
// @access    Private
exports.updateClient = factory.updateOne(Client);

// @route     DELETE clients/:id
// @desc      Delete client
// @access    Private
exports.deleteClient = catchAsync(async (req, res, next) => {
  const deletedClient = await Client.findByIdAndUpdate(
    req.params.id,
    { deleted: true },
    {
      new: true
    }
  );

  if (!deletedClient) {
    return next(new AppError("No client found with this ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
