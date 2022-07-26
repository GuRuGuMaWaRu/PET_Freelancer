import { model, Schema, InferSchemaType } from "mongoose";

const clientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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

clientSchema.index(
  {
    user: 1,
    name: 1
  },
  { unique: true }
);

clientSchema.pre("find", function(next) {
  this.find({ deleted: { $ne: true } }).sort({ name: 1 });

  next();
});

clientSchema.pre("findOne", function(next) {
  this.select("name");

  next();
});

export type IClient = InferSchemaType<typeof clientSchema>;

const Client = model<IClient>("Client", clientSchema);
export default Client;
