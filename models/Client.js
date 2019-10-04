const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("client", ClientSchema);
