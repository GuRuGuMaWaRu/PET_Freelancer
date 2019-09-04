const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

/* SAVE a new project */
router.post("/", projectController.create);

module.exports = router;
