const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const clientController = require("../controllers/clientController");

router
  .route("/")
  // @route     GET clients/
  // @desc      Get all clients
  // @access    Private
  .get(auth, clientController.getAllClients);

module.exports = router;
