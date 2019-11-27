const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
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
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
