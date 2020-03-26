const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const { validateForm } = require("../middleware/validation");
const authController = require("../controllers/authController");

router
  .route("/")
  // @route     GET api/auth
  // @desc      Get logged in user
  // @access    Private
  .get(auth, authController.getUser)
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
