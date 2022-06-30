const express = require("express");

const { protect } = require("../../utils");
const clientControllers = require("./client.controllers");

const router = express.Router();

router.use(protect);

router
  .route("/")
  // @route     GET clients/
  // @desc      Get all clients
  // @access    Private
  .get(clientControllers.getAll)
  // @route     POST clients/
  // @desc      Create client
  // @access    Private
  .post(clientControllers.createOne);

router
  .route("/:id")
  // @route     GET clients/:id
  // @desc      Get client
  // @access    Private
  .get(clientControllers.getOne)
  // @route     PATCH clients/:id
  // @desc      Update client
  // @access    Private
  .patch(clientControllers.updateOne)
  // @route     DELETE clients/:id
  // @desc      Delete client
  // @access    Private
  .delete(clientControllers.deleteOne);

module.exports = router;
