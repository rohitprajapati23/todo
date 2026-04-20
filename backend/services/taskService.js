const Task = require("../models/Task");


async function createTask(data) {
    if (!data.title) {
        throw new Error("Title is required");
    }

    const task = new Task({
        title: data.title,
        description: data.description
    });

    return await task.save();
}


async function getTasks() {
    return await Task.find();
}


async function searchTasks(query) {
    if (!query) {
        return [];
    }

    return await Task.find({
        title: { $regex: query, $options: "i" }
    });
}


async function updateTask(id, data) {
    const task = await Task.findByIdAndUpdate(id, data, { new: true });

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
}


async function updateStatus(id, status) {
    const task = await Task.findByIdAndUpdate(
        id,
        { completed: status },
        { new: true }
    );

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
}


async function deleteTask(id) {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new Error("Task not found");
    }
}

module.exports = {
    createTask,
    getTasks,
    searchTasks,
    updateTask,
    updateStatus,
    deleteTask
};
