const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("Auth middleware: no token provided");
    return res
      .status(401)
      .json({ msg: "No token provided, authorization denied" });
  }

  console.log("Auth middleware: token is provided");
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
