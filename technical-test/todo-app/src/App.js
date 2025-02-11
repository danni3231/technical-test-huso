import React, { useState } from "react";
import Task from "./Components/Task";

import "./App.css";

const initialTasks = [
  { id: 1, name: "Tarea 1", status: "pending" },
  { id: 2, name: "Tarea 2", status: "in-progress" },
  { id: 3, name: "Tarea 3", status: "completed" },
];

const statuses = ["pending", "in-progress", "completed"];
function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [history, setHistory] = useState([]);

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === Number(taskId) ? { ...task, status: newStatus } : task
    );

    // Guardar en el historial
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, tasks];
      return newHistory.length > 3 ? newHistory.slice(1) : newHistory;
    });

    setTasks(updatedTasks);
  };

  const undo = () => {
    if (history.length > 0) {
      setTasks(history[history.length - 1]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  return (
  <div className="App">
    <h1>Gestión de Tareas</h1>
    <button
      onClick={undo}
      disabled={history.length === 0}
    >
      Deshacer
    </button>
    <div className="tasks">
      {statuses.map((status) => (
        <div
          key={status}
          className=""
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, status)}
        >
          <h2 className="text-lg font-semibold mb-2">{status.toUpperCase()}</h2>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <Task key={task.id} title={task.name} id={task.id} onDragStart={onDragStart} />
            ))}
        </div>
      ))}
    </div>
  </div>);
}

export default App;
