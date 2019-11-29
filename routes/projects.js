const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const projectController = require("../controllers/projectController");

// @route     GET projects/
// @desc      Get all projects
// @access    Private
router.get("/", auth, projectController.index);
// @route     POST projects/
// @desc      Save a new project
// @access    Private
router.post("/", auth, projectController.create);
// @route     GET projects/:id
// @desc      Get a project
// @access    Private
router.get("/:id", auth, projectController.read);
// @route     PATCH projects/:id
// @desc      Update a project
// @access    Private
router.patch("/:id", auth, projectController.update);
// @route     DELETE projects/:id
// @desc      Delete a project
// @access    Private
router.delete("/:id", auth, projectController.delete);

module.exports = router;
