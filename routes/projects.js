const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const projectController = require("../controllers/projectController");

// @route     GET projects/
// @desc      Get all projects
// @access    Private
router.get("/", auth, projectController.getAllProjects);
// @route     POST projects/
// @desc      Save a new project
// @access    Private
router.post("/", auth, projectController.createProject);
// @route     GET projects/:id
// @desc      Get a project
// @access    Private
router.get("/:id", auth, projectController.getProject);
// @route     PATCH projects/:id
// @desc      Update a project
// @access    Private
router.patch("/:id", auth, projectController.updateProject);
// @route     DELETE projects/:id
// @desc      Delete a project
// @access    Private
router.delete("/:id", auth, projectController.deleteProject);

module.exports = router;
