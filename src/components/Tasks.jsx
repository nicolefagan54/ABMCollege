import React, { useEffect, useState } from "react";

const STORAGE_KEY = "dlo_tasks";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), title: trimmed, isDone: false }]);
    setTitle("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  return (
    <div className="card">
      <h2>Tasks</h2>
      <div className="input-row">
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="New task..." 
        />
        <button className="primary-btn" onClick={addTask}>Add</button>
      </div>
      <ul className="list">
        {tasks.map(task => (
          <li key={task.id} className="list-item">
            <span style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>{task.title}</span>
            <label className="toggle">
              <input type="checkbox" checked={task.isDone} onChange={() => toggleTask(task.id)} />
              <span className="toggle-label">{task.isDone ? 'Done' : 'Pending'}</span>
            </label>
          </li>
        ))}
        {tasks.length === 0 && <p className="empty">No tasks yet.</p>}
      </ul>
    </div>
  );
}
