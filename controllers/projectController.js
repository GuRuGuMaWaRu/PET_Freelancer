const Client = require("../models/clientModel");
const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Middleware
// exports.createNewClient = catchAsync(async (req, res, next) =>

// );

// @route     GET projects/
// @desc      Get all projects
// @access    Private
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({
    user: req.user.id
  });

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: {
      projects
    }
  });
});

// @route     POST projects/
// @desc      Save new project
// @access    Private
exports.createProject = catchAsync(async (req, res, next) => {
  let newClient;

  if (req.body.newClient && req.body.newClient.length > 0) {
    const existingClient = await Client.findOne({
      name: req.body.newClient,
      user: req.user.id
    });

    if (!existingClient) {
      newClient = new Client({
        name: req.body.newClient,
        user: req.user.id
      });

      req.body.client = newClient._id;

      await newClient.save();
    } else {
      req.body.client = existingClient._id;
    }
  }

  const project = new Project({
    ...req.body,
    user: req.user.id
  });
  await project.save();

  const newProject = await Project.findOne({
    _id: project._id,
    user: req.user.id
  })
    .populate("client")
    .select("client currency date payment projectNr _id");

  res.status(201).json({ status: "success", data: { newProject, newClient } });
});

// @route     GET projects/:id
// @desc      Get project
// @access    Private
exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user.id
  });
  // .select("client currency date payment projectNr _id");

  if (!project) {
    return next(new AppError("No project found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { project }
  });
});

// @route     PATCH projects/:id
// @desc      Update project
// @access    Private
exports.updateProject = catchAsync(async (req, res, next) => {
  let newClient;

  // if new client is provided
  if (req.body.newClient && req.body.newClient.length > 0) {
    const existingClient = await Client.findOne({
      name: req.body.newClient,
      user: req.user.id
    });

    if (!existingClient) {
      newClient = new Client({
        name: req.body.newClient,
        user: req.user.id
      });

      req.body.client = newClient._id;

      await newClient.save();
    } else {
      req.body.client = existingClient._id;
    }
  }

  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id
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
});

// @route     DELETE projects/:id
// @desc      Delete project
// @access    Private
exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { deleted: true },
    { new: true }
  );

  if (!project) {
    return next(new AppError("No project found with this ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
