const Task = require("../models/Task");


async function createTask(data) {
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
    return await Task.find({
        title: { $regex: query, $options: "i" }
    });
}


async function getTaskById(id) {
    return await Task.findById(id);
}


async function updateTask(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
}


async function updateStatus(id, status) {
    return await Task.findByIdAndUpdate(
        id,
        { completed: status },
        { new: true }
    );
}


async function deleteTask(id) {
    return await Task.findByIdAndDelete(id);
}

module.exports = {
    createTask,
    getTasks,
    searchTasks,
    getTaskById,
    updateTask,
    updateStatus,
    deleteTask
};
