const Task = require("../models/Task");

exports.createTask = (data) => Task.create(data);

exports.getTasks = () => Task.find();

exports.getTaskById = (id) => Task.findById(id);

exports.updateTask = (id, data) =>
  Task.findByIdAndUpdate(id, data, { new: true });

exports.deleteTask = (id) =>
  Task.findByIdAndDelete(id);

// 🔍 SEARCH
exports.searchTasks = (query) =>
  Task.find({ title: { $regex: query, $options: "i" } });

// 🔁 STATUS UPDATE
exports.updateStatus = (id, completed) =>
  Task.findByIdAndUpdate(id, { completed }, { new: true });