const taskService = require("../services/taskService");


exports.createTask = async (req, res) => {
    try {
        const result = await taskService.createTask(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const result = await taskService.getTasks();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getTask = async (req, res) => {
    try {
        const result = await taskService.getTaskById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const result = await taskService.updateTask(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
