const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Client", ClientSchema);
