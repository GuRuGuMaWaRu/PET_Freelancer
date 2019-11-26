const Client = require("../models/Client");
const Project = require("../models/Project");

module.exports = {
  index: async (req, res) => {
    try {
      const projects = await Project.find({ deleted: { $ne: true } })
        .populate("client")
        .select("client currency date payment projectNr _id")
        .sort({ date: -1 });

      res.status(200).json(projects);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const shopData = req.body;

    try {
      if (shopData.newClient.length > 0) {
        const oldClient = await Client.findOne({ name: shopData.newClient });

        if (!oldClient) {
          const newClient = new Client({
            name: shopData.newClient
          });

          shopData.client = newClient._id;

          await newClient.save();
        } else {
          shopData.client = oldClient._id;
        }
      }

      await Project.create(shopData);
      res.status(201).json({ msg: "Project saved." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  read: async (req, res) => {
    const projectId = req.params.id;

    try {
      const project = await Project.findById(projectId).select(
        "client currency date payment projectNr _id"
      );

      if (!project) {
        res.status(404).json({ err: "Project with this ID is not found." });
      }

      res.status(200).json(project);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const projectId = req.params.id;
    const shopData = req.body;

    try {
      const project = await Project.findById(projectId);

      // if new client is provided
      if (shopData.newClient.length > 0) {
        const oldClient = await Client.findOne({ name: shopData.newClient });

        if (!oldClient) {
          const newClient = new Client({
            name: shopData.newClient
          });

          shopData.client = newClient._id;

          await newClient.save();
        } else {
          shopData.client = oldClient._id;
        }
      }

      if (!project) {
        res.status(404).json({ err: "Project with this ID is not found." });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        shopData,
        { new: true }
      );

      res.status(200).json(updatedProject);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const projectId = req.params.id;

    try {
      const project = await Project.findById(projectId);

      if (!project) {
        res.status(404).json({ err: "Project with this ID is not found." });
      }

      await Project.findOneAndUpdate({ _id: projectId }, { deleted: true });
      res.status(200).json({ msg: "Project deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
};
