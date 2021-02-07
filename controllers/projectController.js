const Project = require("../models/projectModel");
const factory = require("./handlerFactory");

// @route     GET projects/
// @desc      Get all projects
// @access    Private
const getAllProjects = factory.getAll(Project);

// @route     GET projects/:id
// @desc      Get project
// @access    Private
const getProject = factory.getOne(Project);

// @route     POST projects/
// @desc      Create project
// @access    Private
const createProject = factory.createOne(Project);

// @route     PATCH projects/:id
// @desc      Update project
// @access    Private
const updateProject = factory.updateOne(Project);

// @route     DELETE projects/:id
// @desc      Delete project
// @access    Private
const deleteProject = factory.deleteOne(Project);

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
