const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const projectController = require("../controllers/projectController");

router.use(auth);

router
  .route("/")
  // @route     GET projects/
  // @desc      Get all projects
  // @access    Private
  .get(projectController.getAllProjects)
  // @route     POST projects/
  // @desc      Save a new project
  // @access    Private
  .post(projectController.createProject);

router
  .route("/:id")
  // @route     GET projects/:id
  // @desc      Get a project
  // @access    Private
  .get(projectController.getProject)
  // @route     PATCH projects/:id
  // @desc      Update a project
  // @access    Private
  .patch(projectController.updateProject)
  // @route     DELETE projects/:id
  // @desc      Delete a project
  // @access    Private
  .delete(projectController.deleteProject);

module.exports = router;
