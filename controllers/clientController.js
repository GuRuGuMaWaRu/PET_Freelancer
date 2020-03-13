const Client = require("../models/Client");

// @route     GET clients/
// @desc      Get all clients
// @access    Private
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.id }).sort({
      name: 1
    });
    res.status(200).json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
