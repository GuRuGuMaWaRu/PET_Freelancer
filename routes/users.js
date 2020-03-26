const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/userController");
const { validateForm } = require("../middleware/validation");

router
  .route("/")
  // @route     POST users/
  // @desc      Register a user
  // @access    Public
  .post(
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
    userController.registerUser
  );

module.exports = router;
