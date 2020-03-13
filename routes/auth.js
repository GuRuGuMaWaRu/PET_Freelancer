const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", auth, authController.getUser);

// @route     POST api/auth
// @desc      Log in user
// @access    Public
router.post(
  "/",
  [
    check("email", "Please provide valid email").isEmail(),
    check("password", "Please provide password").exists()
  ],
  authController.loginUser
);

module.exports = router;
