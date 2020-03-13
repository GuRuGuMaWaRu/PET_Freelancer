const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

// @route     POST users/
// @desc      Register a user
// @access    Public
exports.registerUser = async (req, res) => {
  // Handle Registration form errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { name, email, password1 } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({
      name,
      email,
      password: password1
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password1, salt);

    await user.save();

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
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
