const Client = require("../models/clientModel");
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
exports.createClient = factory.createOne(Client);

// @route     PATCH clients/:id
// @desc      Update client
// @access    Private
exports.updateClient = factory.updateOne(Client);

// @route     DELETE clients/:id
// @desc      Delete client
// @access    Private
exports.deleteClient = factory.deleteOne(Client);
