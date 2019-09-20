const express = require("express");
const router = express.Router();

/* GET clients. */
router.get("/", function(req, res, next) {
  res.status(200).json({ message: "here are your clients, Sire" });
});

module.exports = router;
