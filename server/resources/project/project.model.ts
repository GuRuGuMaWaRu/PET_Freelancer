import { model, Schema, InferSchemaType } from "mongoose";

const projectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A project must have a user"]
  },
  client: {
    type: Schema.Types.ObjectId,
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
    default: false,
    select: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  comments: {
    type: String
  }
});

projectSchema.index({
  user: 1,
  client: 1
});

projectSchema.pre("find", function(next) {
  this.find({ deleted: { $ne: true } })
    .populate({
      path: "client",
      select: "-user -__v"
    })
    .sort("-date");

  next();
});

projectSchema.pre("findOne", function(next) {
  this.select("-user -__v");

  next();
});

projectSchema.pre("findOneAndUpdate", function(next) {
  this.populate({ path: "client", select: "-user -__v" }).select(
    "client currency date payment paid projectNr _id comments"
  );

  next();
});

export type IProject = InferSchemaType<typeof projectSchema>;

const Project = model<IProject>("Project", projectSchema);
export default Project;
