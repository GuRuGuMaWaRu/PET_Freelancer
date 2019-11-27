const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// @route     GET projects/
// @desc      Get all projects
// @access    Private
router.get("/", projectController.index);
// @route     POST projects/
// @desc      Save a new project
// @access    Private
router.post("/", projectController.create);
// @route     GET projects/:id
// @desc      Get a project
// @access    Private
router.get("/:id", projectController.read);
// @route     PATCH projects/:id
// @desc      Update a project
// @access    Private
router.patch("/:id", projectController.update);
// @route     DELETE projects/:id
// @desc      Delete a project
// @access    Private
router.delete("/:id", projectController.delete);

module.exports = router;
