const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// @route     GET clients/
// @desc      Get all clients
// @access    Private
router.get("/", clientController.index);

module.exports = router;
