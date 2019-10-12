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
    type: String
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
