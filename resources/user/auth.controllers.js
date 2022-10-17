const jwt = require("jsonwebtoken");

const User = require("./user.model");
const { catchAsync, AppError } = require("../../utils");

// Helper functions
const newToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @route     POST api/users/login
// @desc      Log in user
// @access    Public
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError(400, "Invalid credentials"));
  }

  const isMatch = await user.comparePasswords(password, user.password);

  if (!isMatch) {
    return next(new AppError(400, "Invalid credentials"));
  }

  const payload = {
    id: user._id,
  };

  const { name } = user;

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({
        status: "success",
        token,
        data: { name, email },
      });
    },
  );
});

// @route     GET api/users/getUser
// @desc      Get logged in user
// @access    Private
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId)
    .select("-password -_id -__v")
    .lean()
    .exec();
  // Get new token
  const payload = {
    id: user._id,
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({ status: "success", token, data: user });
    },
  );
});

// @route     POST api/users/signup
// @desc      Register a new user
// @access    Public
const signup = catchAsync(async (req, res, next) => {
  // Handle errors on Registration form
  const { name, email, password1 } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new AppError(400, "User already exists"));
  }

  user = await User.create({
    name,
    email,
    password: password1,
  });

  const payload = {
    id: user._id,
  };

  const token = newToken(payload);

  res.status(201).json({ status: "success", token, data: { name, email } });
});

module.exports = {
  login,
  getUser,
  signup,
};
