const express = require("express");
const router = express.Router();

/* GET projects. */
router.get("/", function(req, res, next) {
  res.send("projects listing");
});

module.exports = router;
