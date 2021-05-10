const express = require("express");

const auth = require("../middleware/auth");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.use(auth);

router
  .route("/")
  // @route     GET projects/
  // @desc      Get all projects
  // @access    Private
  .get(projectController.getAllProjects)
  // @route     POST projects/
  // @desc      Create project
  // @access    Private
  .post(projectController.createProject);

router
  .route("/:id")
  // @route     GET projects/:id
  // @desc      Get project
  // @access    Private
  .get(projectController.getProject)
  // @route     PATCH projects/:id
  // @desc      Update project
  // @access    Private
  .patch(projectController.updateProject)
  // @route     DELETE projects/:id
  // @desc      Delete project
  // @access    Private
  .delete(projectController.deleteProject);

module.exports = router;