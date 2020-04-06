const Client = require("../models/clientModel");
const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// @route     GET projects/
// @desc      Get all projects
// @access    Private
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({
    deleted: { $ne: true },
    user: req.user.id
  })
    .populate("client")
    .select("client currency date payment projectNr _id")
    .sort({ date: -1 });

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: {
      projects
    }
  });
});

// @route     POST projects/
// @desc      Save a new project
// @access    Private
exports.createProject = catchAsync(async (req, res, next) => {
  const projectData = req.body;
  let newClient;

  if (projectData.newClient.length > 0) {
    const oldClient = await Client.findOne({
      name: projectData.newClient,
      user: req.user.id
    });

    if (!oldClient) {
      newClient = new Client({
        name: projectData.newClient,
        user: req.user.id
      });

      projectData.client = newClient._id;

      await newClient.save();
    } else {
      projectData.client = oldClient._id;
    }
  }

  const project = new Project({
    ...projectData,
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
// @desc      Get a project
// @access    Private
exports.getProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;

  const project = await Project.findOne({
    _id: projectId,
    user: req.user.id
  }).select("client currency date payment projectNr _id");

  if (!project) {
    return next(new AppError("No project found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { project }
  });
});

// @route     PATCH projects/:id
// @desc      Update a project
// @access    Private
exports.updateProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const shopData = req.body;
  let newClient;

  const project = await Project.findOne({
    _id: projectId,
    user: req.user.id
  });

  // if new client is provided
  if (shopData.newClient && shopData.newClient.length > 0) {
    const oldClient = await Client.findOne({
      name: shopData.newClient,
      user: req.user.id
    });

    if (!oldClient) {
      newClient = new Client({
        name: shopData.newClient,
        user: req.user.id
      });

      shopData.client = newClient._id;

      await newClient.save();
    } else {
      shopData.client = oldClient._id;
    }
  }

  if (!project) {
    return next(new AppError("No project found with this ID", 404));
  }

  await Project.findOneAndUpdate(
    { _id: projectId, user: req.user.id },
    { ...shopData }
  );

  const updatedProject = await Project.findOne({
    _id: projectId,
    user: req.user.id
  })
    .populate("client")
    .select("client currency date payment projectNr _id");

  res
    .status(200)
    .json({ status: "success", data: { updatedProject, newClient } });
});

// @route     DELETE projects/:id
// @desc      Delete a project
// @access    Private
exports.deleteProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;

  const project = await Project.findOne({
    _id: projectId,
    user: req.user.id
  });

  if (!project) {
    return next(new AppError("No project found with this ID", 404));
  }

  await Project.findOneAndUpdate(
    { _id: projectId, user: req.user.id },
    { deleted: true }
  );
  res.status(204).json({ status: "success", data: null });
});
