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

module.exports = router;
