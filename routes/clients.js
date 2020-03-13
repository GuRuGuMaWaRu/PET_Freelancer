const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const clientController = require("../controllers/clientController");

// @route     GET clients/
// @desc      Get all clients
// @access    Private
router.get("/", auth, clientController.getAllClients);

module.exports = router;
