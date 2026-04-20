import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const API = "https://todo-1-t6la.onrender.com/api/tasks";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const handleSubmit = async () => {
    if (!title) return alert("Enter title");

    if (editId) {
      await axios.put(`${API}/${editId}`, { title, description });
      setEditId(null);
    } else {
      await axios.post(API, { title, description });
    }

    setTitle("");
    setDescription("");
    fetchTasks();
  };


  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  
  const toggleStatus = async (task) => {
    await axios.patch(`${API}/${task._id}/status`, {
      completed: !task.completed
    });

    fetchTasks();
  };

 
  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task._id);
  };

  
  const searchTasks = async () => {
    const res = await axios.get(`${API}/search?q=${search}`);
    setTasks(res.data);
  };

  return (
    <div className="container">

      <h1>Todo App</h1>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchTasks}>Search</button>

      <br /><br />

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      <hr />

      {tasks.map((task) => (
        <div key={task._id} className="task">

          <h3 className={task.completed ? "done" : ""}>
            {task.title}
          </h3>

          <p>{task.description}</p>

          <button onClick={() => toggleStatus(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button onClick={() => editTask(task)}>Edit</button>

          <button onClick={() => deleteTask(task._id)}>Delete</button>

        </div>
      ))}

    </div>
  );
}

export default App;
