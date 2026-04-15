import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  
  const [tasks, setTasks] = useState([]);

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const API = "https://todo-1-t6la.onrender.com";

  
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);
      setTasks(res.data);

      setError("");
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchTasks();
  }, []);

  
  const addTask = async () => {
    try {
      if (!title) {
        alert("Title is required");
        return;
      }

      await axios.post(API, {
        title: title,
        description: description
      });

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (err) {
      setError("Failed to add task");
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };


  const toggleTask = async (task) => {
    try {
      await axios.put(`${API}/${task._id}`, {
        completed: !task.completed
      });

      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <h1>Task Manager</h1>

      
      {loading && <p>Loading...</p>}

     
      {error && <p style={{ color: "red" }}>{error}</p>}

      
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={addTask}>Add Task</button>

      <hr />

     
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3
            style={{
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            {task.title}
          </h3>

          <p>{task.description}</p>

          <button onClick={() => toggleTask(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;
