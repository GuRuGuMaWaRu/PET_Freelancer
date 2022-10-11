const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A project must have a user"],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "A project must have a client"],
  },
  projectNr: {
    type: String,
    trim: true,
    required: true,
  },
  payment: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    enum: ["USD", "EUR"],
    default: "USD",
  },
  date: {
    type: Date,
    required: [true, "A project must have a date"],
  },
  deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: String,
  },
});

projectSchema.index({
  user: 1,
  client: 1,
});

projectSchema.pre("find", function(next) {
  this.find({ deleted: { $ne: true } })
    .populate({
      path: "client",
      select: "-_id -user -__v",
    })
    .sort("-date");

  next();
});

projectSchema.pre("findOne", function(next) {
  this.select("-user -__v");

  next();
});

projectSchema.pre("findOneAndUpdate", function(next) {
  this.populate("client").select(
    "client currency date payment paid projectNr _id comments",
  );

  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
