const express = require("express");
const router = express.Router();

const controller = require("../controllers/taskController");
const validateTask = require("../middleware/validation");

router.post("/", validateTask, controller.createTask);
router.get("/", controller.getTasks);
router.get("/search", controller.searchTasks);

router.put("/:id", validateTask, controller.updateTask);
router.patch("/:id/status", controller.updateStatus);

router.delete("/:id", controller.deleteTask);

module.exports = router;
