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
    console.log("Auth middleware: trying to verify token");

    const decoded = jwt.verify(token, process.env.JWTSECRET);
    console.log("Auth middleware: decoded.user:", decoded.user);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
