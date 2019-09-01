const express = require("express");
const router = express.Router();

/* Authorization. */
router.get("/", function(req, res, next) {
  res.send("authorization");
});

module.exports = router;
