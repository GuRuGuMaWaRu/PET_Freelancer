const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/userController");

// @route     POST users/
// @desc      Register a user
// @access    Public
router.post(
  "/",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please add email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  userController.post
);

module.exports = router;
