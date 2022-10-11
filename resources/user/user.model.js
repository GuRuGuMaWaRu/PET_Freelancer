const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
    // select: false
  },
  deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
});

userSchema.index(
  {
    email: 1,
  },
  { unique: true },
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
    next(err);
  }
});

userSchema.methods.comparePasswords = async (password1, password2) => {
  return await bcrypt.compare(password1, password2);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
