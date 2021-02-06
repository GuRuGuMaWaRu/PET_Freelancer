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
  },
  deleted: {
    type: Boolean,
    default: false,
    select: false
  }
});

clientSchema.pre("find", function(next) {
  this.find({ deleted: { $ne: true } }).sort({ name: 1 });

  next();
});

clientSchema.pre("findOne", function(next) {
  this.select("name");

  next();
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
