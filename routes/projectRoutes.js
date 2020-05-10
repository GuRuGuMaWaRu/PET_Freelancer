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
  .get(projectController.getAllProjects);
// @route     POST projects/
// @desc      Create project and (possibly) client
// @access    Private
// .post(projectController.createProjectAndClient);

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

//--> Specialized routes
router
  .route("/withClient")
  // @route     POST projects/
  // @desc      Create project and (possibly) client
  // @access    Private
  .post(projectController.createProjectWithClient);

module.exports = router;
