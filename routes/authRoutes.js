const express = require("express");
const { check } = require("express-validator");

const { protect } = require("../utils/auth");
const { validateForm } = require("../utils/validation");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  // @route     GET api/auth
  // @desc      Get logged in user
  // @access    Private
  .get(protect, authController.getUser)
  // @route     POST api/auth
  // @desc      Log in user
  // @access    Public
  .post(
    [
      check("email", "Please provide valid email").isEmail(),
      check("password", "Please provide password").exists()
    ],
    validateForm,
    authController.loginUser
  );

module.exports = router;
