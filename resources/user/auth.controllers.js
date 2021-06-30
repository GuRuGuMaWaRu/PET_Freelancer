const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./user.model");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

// Helper functions
const newToken = payload => {
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// @route     POST api/users/login
// @desc      Log in user
// @access    Public
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid credentials", 400));
  }

  const isMatch = await user.comparePasswords(password, user.password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 400));
  }

  const payload = {
    id: user._id
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({ status: "success", token });
    }
  );
});

// @route     GET api/users/getUser
// @desc      Get logged in user
// @access    Private
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId)
    .select("-password")
    .lean()
    .exec();
  // Get new token
  const payload = {
    id: user._id
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({ status: "success", token, data: { user } });
    }
  );
});

// @route     POST api/users/signup
// @desc      Register a new user
// @access    Public
const signup = catchAsync(async (req, res, next) => {
  // Handle errors on Registration form
  const { name, email, password1 } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return next(new AppError("User already exists", 400));
    }

    user = await User.create({
      name,
      email,
      password: password1
    });

    const payload = {
      id: user._id
    };

    const token = newToken(payload);

    res.status(201).json({ status: "success", token });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  login,
  getUser,
  signup
};
