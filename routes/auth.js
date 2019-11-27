const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("../controllers/authController");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", authController.get);

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  "/",
  [
    check("email", "Please provide valid email").isEmail(),
    check("password", "Please provide password").exists()
  ],
  authController.login
);

module.exports = router;
