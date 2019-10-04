const express = require("express");
const router = express.Router();

/* Authorization. */
router.get("/", function(req, res, next) {
  res.status(200).json({ message: "authorization" });
});

module.exports = router;
