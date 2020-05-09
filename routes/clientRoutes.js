const express = require("express");

const auth = require("../middleware/auth");
const clientController = require("../controllers/clientController");

const router = express.Router();

router
  .route("/")
  // @route     GET clients/
  // @desc      Get all clients
  // @access    Private
  .get(auth, clientController.getAllClients)
  // @route     POST clients/
  // @desc      Create client
  // @access    Private
  .post(auth, clientController.createClient);

router
  .route("/:id")
  // @route     GET clients/:id
  // @desc      Get client
  // @access    Private
  .get(auth, clientController.getClient)
  // @route     PATCH clients/:id
  // @desc      Update client
  // @access    Private
  .patch(auth, clientController.updateClient);

module.exports = router;
