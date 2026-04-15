const Task = require("../models/Task");


async function createTask(data) {
    try {
        if (!data.title) {
            throw new Error("Title is required");
        }

        const newTask = new Task({
            title: data.title,
            description: data.description
        });

        const savedTask = await newTask.save();
        return savedTask;

    } catch (error) {
        throw new Error(error.message);
    }
}


async function getTasks() {
    try {
        const tasks = await Task.find();
        return tasks;
    } catch (error) {
        throw new Error("Unable to fetch tasks");
    }
}


async function getTaskById(id) {
    try {
        const task = await Task.findById(id);

        if (!task) {
            throw new Error("Task not found");
        }

        return task;
    } catch (error) {
        throw new Error("Error getting task");
    }
}


async function updateTask(id, data) {
    try {
        const updated = await Task.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!updated) {
            throw new Error("Task not found");
        }

        return updated;
    } catch (error) {
        throw new Error("Error updating task");
    }
}

async function deleteTask(id) {
    try {
        const deleted = await Task.findByIdAndDelete(id);

        if (!deleted) {
            throw new Error("Task not found");
        }

        return deleted;
    } catch (error) {
        throw new Error("Error deleting task");
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
