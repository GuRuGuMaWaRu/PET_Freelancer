import { Model, Schema, model, InferSchemaType } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  deleted: boolean;
}
interface IUserMethods {
  comparePasswords: (password1: string, password2: string) => Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6
    // select: false
  },
  deleted: {
    type: Boolean,
    default: false,
    select: false
  }
});

userSchema.index(
  {
    email: 1
  },
  { unique: true }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    next(
      new Error("There was an error inside a userSchema pre-save middleware")
    );
  }
});

userSchema.methods.comparePasswords = async (
  password1: string,
  password2: string
) => {
  return await bcrypt.compare(password1, password2);
};

const User = model<IUser, UserModel>("User", userSchema);
export default User;
