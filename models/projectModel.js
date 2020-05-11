const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A project must have a user"]
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "A project must have a client"]
  },
  projectNr: {
    type: String,
    trim: true,
    required: true
  },
  payment: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    enum: ["USD", "EUR"],
    default: "USD"
  },
  date: {
    type: Date,
    required: [true, "A project must have a date"]
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

projectSchema.pre("find", function(next) {
  this.find({ deleted: { $ne: true } })
    .populate({ path: "client", select: "name -_id" })
    .select("-deleted -user -__v")
    .sort({ date: -1 });

  next();
});

// projectSchema.pre("findOne", function(next) {
//   this.select("-deleted -user -__v");

//   next();
// });

projectSchema.pre("findOneAndUpdate", function(next) {
  this.populate("client").select("client currency date payment projectNr _id");

  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
