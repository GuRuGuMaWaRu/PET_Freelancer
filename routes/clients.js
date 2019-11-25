const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

/* GET clients */
router.get("/", clientController.index);

module.exports = router;
