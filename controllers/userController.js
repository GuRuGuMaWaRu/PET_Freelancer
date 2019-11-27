const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");

module.exports = {
  post: async (req, res) => {
    // Handle Registration form errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists " });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

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
      console.log(err.message);
      res.status(500).json({ msg: err.message });
    }

    console.log("User POST route");
  }
};
