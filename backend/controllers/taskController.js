const service = require("../services/taskService");


exports.createTask = async (req, res) => {
    try {
        const newTask = await service.createTask(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({
            message: "Error while creating task"
        });
    }
};



exports.getTasks = async (req, res) => {
    try {
        const allTasks = await service.getTasks();
        res.json(allTasks);
    } catch (err) {
        res.status(500).json({
            message: "Error while getting tasks"
        });
    }
};



exports.searchTasks = async (req, res) => {
    try {
        const searchText = req.query.q;

        const result = await service.searchTasks(searchText);
        res.json(result);

    } catch (err) {
        res.status(500).json({
            message: "Error while searching"
        });
    }
};



exports.updateTask = async (req, res) => {
    try {
        const id = req.params.id;

        const updatedTask = await service.updateTask(id, req.body);
        res.json(updatedTask);

    } catch (err) {
        res.status(400).json({
            message: "Task not found or update failed"
        });
    }
};



exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.completed;

        const updated = await service.updateStatus(id, status);
        res.json(updated);

    } catch (err) {
        res.status(400).json({
            message: "Error updating status"
        });
    }
};



exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;

        await service.deleteTask(id);
        res.json({ message: "Task deleted" });

    } catch (err) {
        res.status(400).json({
            message: "Error deleting task"
        });
    }
};
