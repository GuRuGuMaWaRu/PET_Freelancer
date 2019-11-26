const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/", projectController.index);
router.post("/", projectController.create);
router.get("/:id", projectController.read);
router.patch("/:id", projectController.update);
router.delete("/:id", projectController.delete);

module.exports = router;
