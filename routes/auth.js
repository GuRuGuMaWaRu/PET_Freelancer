const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", authController.get);

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post("/", authController.post);

module.exports = router;
