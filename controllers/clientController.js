const Client = require("../models/clientModel");
const factory = require("./handlerFactory");

// @route     GET clients/
// @desc      Get all clients
// @access    Private
const getAllClients = factory.getAll(Client);

// @route     GET clients/:id
// @desc      Get client
// @access    Private
const getClient = factory.getOne(Client);

// @route     POST clients/
// @desc      Create client
// @access    Private
const createClient = factory.createOne(Client);

// @route     PATCH clients/:id
// @desc      Update client
// @access    Private
const updateClient = factory.updateOne(Client);

// @route     DELETE clients/:id
// @desc      Delete client
// @access    Private
const deleteClient = factory.deleteOne(Client);

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient
};
