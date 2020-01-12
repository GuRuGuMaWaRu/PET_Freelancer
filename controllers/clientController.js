const Client = require("../models/Client");

module.exports = {
  // @route     GET clients/
  // @desc      Get all clients
  // @access    Private
  index: async (req, res) => {
    try {
      const clients = await Client.find({ user: req.user.id }).sort({
        name: 1
      });
      res.status(200).json(clients);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
};
