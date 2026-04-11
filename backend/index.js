const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🧠 In-memory database
let tasks = [];
let currentId = 1;

// -------------------- HOME ROUTE --------------------
app.get("/", (req, res) => {
    res.send("To-Do API is running 🚀");
});

// -------------------- ADD TASK --------------------
app.post("/api/tasks", (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title required" });
    }

    const newTask = {
        id: currentId++,
        title,
        description: description || "",
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created",
        task: newTask
    });
});

// -------------------- GET ALL TASKS --------------------
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// -------------------- UPDATE TASK --------------------
app.put("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json({
        message: "Task updated",
        task
    });
});

// -------------------- DELETE TASK --------------------
app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.filter(t => t.id !== id);

    res.json({ message: "Task deleted" });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});