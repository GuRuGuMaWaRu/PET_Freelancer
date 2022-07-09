import express from "express";
import { check } from "express-validator";

import { protect, validateForm } from "../../utils";
import * as authControllers from "./auth.controllers";
import userControllers from "./user.controllers";

const router = express.Router();

// Authorization routes
router.get("/getUser", protect, authControllers.getUser);
router.post(
  "/login",
  [
    check("email", "Please provide valid email").isEmail(),
    check("password", "Please provide password").exists()
  ],
  validateForm,
  authControllers.login
);
router.post(
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
  authControllers.signup
);

//--> Admin routes
router.use(protect);

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

export default router;
