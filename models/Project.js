const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  projectNr: {
    type: String,
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "USD"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("project", ProjectSchema);
