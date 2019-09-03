const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
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
    default: "USD",
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = projectModel("project", ProjectSchema);
