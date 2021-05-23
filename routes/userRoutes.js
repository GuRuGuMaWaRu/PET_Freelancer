const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/authController");
const { validateForm } = require("../utils/validation");

const router = express.Router();

router
  // @route     POST users/signup/
  // @desc      Create user
  // @access    Public
  .post(
    "/signup",
    [
      check("name", "Please add name")
        .not()
        .isEmpty(),
      check("email", "Please add email").isEmail(),
      check(
        "password1",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ],
    validateForm,
    authController.signUp
  );

module.exports = router;
