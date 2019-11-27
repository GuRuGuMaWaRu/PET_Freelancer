const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// @route     POST users/
// @desc      Register a user
// @access    Public
router.post("/", userController.post);

module.exports = router;
