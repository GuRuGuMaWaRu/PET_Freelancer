const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

// @route     POST api/auth
// @desc      Log in user
// @access    Public
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: "90d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  // Get new token
  const payload = {
    user: {
      id: user._id
    }
  };

  jwt.sign(
    payload,
    process.env.JWTSECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({ user, token });
    }
  );
});
