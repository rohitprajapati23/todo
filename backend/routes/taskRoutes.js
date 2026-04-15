const express = require("express");
const router = express.Router();

const controller = require("../controllers/taskController");
const validateTask = require("../middleware/validation");

router.post("/", validateTask, controller.createTask);
router.get("/", controller.getTasks);
router.get("/:id", controller.getTask);
router.put("/:id", validateTask, controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
