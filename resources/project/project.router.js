const express = require("express");

const { protect } = require("../../utils");
const projectControllers = require("./project.controllers");

const router = express.Router();

router.use(protect);

router
  .route("/")
  // @route     GET projects/
  // @desc      Get all projects
  // @access    Private
  .get(projectControllers.getAll)
  // @route     POST projects/
  // @desc      Create project
  // @access    Private
  .post(projectControllers.createOne);

router
  .route("/:id")
  // @route     GET projects/:id
  // @desc      Get project
  // @access    Private
  .get(projectControllers.getOne)
  // @route     PATCH projects/:id
  // @desc      Update project
  // @access    Private
  .patch(projectControllers.updateOne)
  // @route     DELETE projects/:id
  // @desc      Delete project
  // @access    Private
  .delete(projectControllers.deleteOne);

module.exports = router;
