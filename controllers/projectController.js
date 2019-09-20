const Client = require("../models/Client");
const Project = require("../models/Project");

module.exports = {
  create: async (req, res) => {
    const shopData = req.body;

    if (shopData.newClient.length > 0) {
      const newClient = new Client({
        name: shopData.newClient
      });

      shopData.project.client = newClient._id;

      await newClient.save();
    }

    await Project.create(shopData.project);

    res.status(201).json({ message: "All is good." });
  }
};
