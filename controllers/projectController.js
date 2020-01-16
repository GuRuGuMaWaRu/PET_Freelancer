const Client = require("../models/Client");
const Project = require("../models/Project");

module.exports = {
  // @route     GET projects/
  // @desc      Get all projects
  // @access    Private
  index: async (req, res) => {
    try {
      const projects = await Project.find({
        deleted: { $ne: true },
        user: req.user.id
      })
        .populate("client")
        .select("client currency date payment projectNr _id")
        .sort({ date: -1 });

      res.status(200).json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  // @route     POST projects/
  // @desc      Save a new project
  // @access    Private
  create: async (req, res) => {
    const projectData = req.body;
    let newClient;

    try {
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

      res.status(201).json({ newProject: newProject, newClient: newClient });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  // @route     GET projects/:id
  // @desc      Get a project
  // @access    Private
  read: async (req, res) => {
    const projectId = req.params.id;

    try {
      const project = await Project.findOne({
        _id: projectId,
        user: req.user.id
      }).select("client currency date payment projectNr _id");

      if (!project) {
        res.status(404).json({ error: "Project with this ID is not found" });
      }

      res.status(200).json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  // @route     PATCH projects/:id
  // @desc      Update a project
  // @access    Private
  update: async (req, res) => {
    const projectId = req.params.id;
    const shopData = req.body;
    let newClient;

    try {
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
        res.status(404).json({ error: "Project with this ID is not found" });
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

      res.status(200).json({ updatedProject, newClient });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  // @route     DELETE projects/:id
  // @desc      Delete a project
  // @access    Private
  delete: async (req, res) => {
    const projectId = req.params.id;

    try {
      const project = await Project.findOne({
        _id: projectId,
        user: req.user.id
      });

      if (!project) {
        res.status(404).json({ error: "Project with this ID is not found" });
      }

      await Project.findOneAndUpdate(
        { _id: projectId, user: req.user.id },
        { deleted: true }
      );
      res.status(200).json({ msg: "Project deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
};
