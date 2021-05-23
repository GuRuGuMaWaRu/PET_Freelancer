const express = require("express");

const { protect } = require("../../utils/auth");
const userControllers = require("./user.controllers");

const router = express.Router();

router.use(protect);

//--> Admin routes

router
  .route("/")
  // @route     GET users/
  // @desc      Get all users
  // @access    Private
  .get(userControllers.getAll);

router
  .route("/:id")
  // @route     GET users/:id
  // @desc      Get user
  // @access    Private
  .get(userControllers.getOne)
  // @route     DELETE users/:id
  // @desc      Delete user
  // @access    Private
  .delete(userControllers.deleteOne);

module.exports = router;
