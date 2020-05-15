const Client = require("../models/clientModel");
const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

// Middleware
// exports.createNewClient = catchAsync(async (req, res, next) =>

// );

// @route     GET projects/
// @desc      Get all projects
// @access    Private
exports.getAllProjects = factory.getAll(Project);

// @route     GET projects/:id
// @desc      Get project
// @access    Private
exports.getProject = factory.getOne(Project);

// @route     POST projects/
// @desc      Create project
// @access    Private
exports.createProject = factory.createOne(Project);

// @route     POST projects/withClient/
// @desc      Create project and (possibly) client
// @access    Private
exports.createProjectWithClient = catchAsync(async (req, res, next) => {
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
  })
    .populate("client")
    .select("client currency date payment projectNr _id");

  res.status(201).json({ status: "success", data: { newProject, newClient } });
});

// @route     PATCH projects/:id
// @desc      Update project
// @access    Private
exports.updateProject = factory.updateOne(Project);

// @route     PATCH projects/:id/withClient/
// @desc      Update project and (possibly) client
// @access    Private
exports.updateProjectWithClient = catchAsync(async (req, res, next) => {
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
exports.deleteProject = factory.deleteOne(Project);
