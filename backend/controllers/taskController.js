const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await taskService.getTasks();
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.json({ message: "Deleted" });
};

// 🔍 SEARCH
exports.searchTasks = async (req, res) => {
  const tasks = await taskService.searchTasks(req.query.q);
  res.json(tasks);
};

// 🔁 STATUS UPDATE
exports.updateStatus = async (req, res) => {
  const task = await taskService.updateStatus(
    req.params.id,
    req.body.completed
  );
  res.json(task);
};