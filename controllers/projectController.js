const Client = require("../models/clientModel");
const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
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

// @route     POST projects/withClient/
// @desc      Create project and (possibly) client
// @access    Private
const createProjectWithClient = catchAsync(async (req, res, next) => {
  let newClient = null;

  //--> Create new client OR get existing client id
  if (req.body.newClient && req.body.newClient.trim().length > 0) {
    const existingClient = await Client.findOne({
      name: req.body.newClient,
      user: req.userId
    });

    if (!existingClient) {
      newClient = new Client({
        name: req.body.newClient,
        user: req.userId
      });

      req.body.client = newClient._id;

      await newClient.save();
    } else {
      req.body.client = existingClient._id;
    }
  }
  //--> Create & save new project
  const project = new Project({
    ...req.body,
    user: req.userId
  });
  await project.save();

  //--> Get newly created project from DB
  const newProject = await Project.findOne({
    _id: project._id,
    user: req.userId
  }).populate({ path: "client", select: "-_id" });

  res.status(201).json({ status: "success", data: { newProject, newClient } });
});

// @route     PATCH projects/:id
// @desc      Update project
// @access    Private
const updateProject = factory.updateOne(Project);

// @route     PATCH projects/:id/withClient/
// @desc      Update project and (possibly) client
// @access    Private
const updateProjectWithClient = catchAsync(async (req, res, next) => {
  let newClient = null;

  //--> Create new client OR get existing client id
  if (req.body.newClient && req.body.newClient.trim().length > 0) {
    const existingClient = await Client.findOne({
      name: req.body.newClient,
      user: req.userId
    });

    if (!existingClient) {
      newClient = new Client({
        name: req.body.newClient,
        user: req.userId
      });

      req.body.client = newClient._id;

      await newClient.save();
    } else {
      req.body.client = existingClient._id;
    }
  }

  //--> Update project
  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.userId
    },
    req.body,
    { new: true }
  );

  if (!updatedProject) {
    return next(new AppError("No project found with this ID", 404));
  }

  res
    .status(200)
    .json({ status: "success", data: { updatedProject, newClient } });
  // .json({ status: "success", data: null });
});

// @route     DELETE projects/:id
// @desc      Delete project
// @access    Private
const deleteProject = factory.deleteOne(Project);

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  createProjectWithClient,
  updateProject,
  updateProjectWithClient,
  deleteProject
};
