const Client = require("../models/Client");

module.exports = {
  index: async (req, res) => {
    const clients = await Client.find().sort({ name: 1 });
    console.log(clients);
    res.status(200).json(clients);
  }
};
