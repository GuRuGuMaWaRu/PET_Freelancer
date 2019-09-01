const express = require("express");
const router = express.Router();

/* GET clients. */
router.get("/", function(req, res, next) {
  res.send("here are your clients, Sire");
});

module.exports = router;
