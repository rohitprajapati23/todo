import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const API = process.env.REACT_APP_API_URL;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);
      setTasks(res.data);

      setError("");
    } catch (err) {
      setError("Cannot load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!title) {
        alert("Enter title");
        return;
      }

      await axios.post(API, { title, description });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (err) {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      setLoading(true);

      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  
  const toggleStatus = async (task) => {
    try {
      setLoading(true);

      await axios.patch(`${API}/${task._id}/status`, {
        completed: !task.completed
      });

      fetchTasks();
    } catch (err) {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  
  const searchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/search?q=${search}`);
      setTasks(res.data);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1>Todo App</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchTasks} disabled={loading}>Search</button>

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

      <button onClick={handleSubmit} disabled={loading}>
        Add Task
      </button>

      <hr />

      {tasks.map((task) => (
        <div key={task._id} className="task">

          <h3 className={task.completed ? "done" : ""}>
            {task.title}
          </h3>

          <p>{task.description}</p>

          <button onClick={() => toggleStatus(task)} disabled={loading}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button onClick={() => deleteTask(task._id)} disabled={loading}>
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default App;
