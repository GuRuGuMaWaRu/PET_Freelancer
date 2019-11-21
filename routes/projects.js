const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post("/", projectController.create);
router.get("/", projectController.index);
router.delete("/:id", projectController.delete);

module.exports = router;
