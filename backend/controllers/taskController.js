const service = require("../services/taskService");


exports.createTask = async (req, res) => {
    try {
        const task = await service.createTask(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Error creating task" });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const tasks = await service.getTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};


exports.searchTasks = async (req, res) => {
    try {
        const q = req.query.q;
        const tasks = await service.searchTasks(q);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error searching tasks" });
    }
};


exports.updateStatus = async (req, res) => {
    try {
        const updated = await service.updateStatus(
            req.params.id,
            req.body.completed
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating status" });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const updated = await service.updateTask(
            req.params.id,
            req.body
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating task" });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        await service.deleteTask(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task" });
    }
};
