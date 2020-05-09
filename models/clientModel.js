const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A client must have a user"]
  },
  name: {
    type: String,
    trim: true,
    required: [true, "A client must have a name"]
  }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;