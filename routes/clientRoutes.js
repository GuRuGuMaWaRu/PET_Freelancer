const express = require("express");

const auth = require("../middleware/auth");
const clientController = require("../controllers/clientController");

const router = express.Router();

router
  .route("/")
  // @route     GET clients/
  // @desc      Get all clients
  // @access    Private
  .get(auth, clientController.getAllClients);

router
  .route("/:id")
  // @route     GET client/:id
  // @desc      Get a particular client
  // @access    Private
  .get(auth, clientController.getClient);

module.exports = router;