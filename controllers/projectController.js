const Client = require("../models/Client");
const Project = require("../models/Project");

module.exports = {
  create: async (req, res) => {
    const shopData = req.body;

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
    res.status(201).json({ message: "Project saved." });
  },
  index: async (req, res) => {
    const projects = await Project.find()
      .populate("client")
      .sort({ date: -1 });

    res.status(200).json(projects);
  }
};
