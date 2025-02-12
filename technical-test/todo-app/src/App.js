import React, { useState, useEffect } from "react";
import Task from "./Components/Task";

import "./App.css";

const statuses = ["pending", "in-progress", "completed"];
function App() {
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  // Load tasks from localStorage at the beginning
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (Array.isArray(savedTasks) && savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      setTasks([
        { id: 1, name: "Mejorar Perfomance", status: "pending" },
        { id: 2, name: "Agregar Timer", status: "in-progress" },
        { id: 3, name: "Agregar Redux", status: "completed" },
      ]);
    }
  }, []);

  // Save tasks in localStorage when task change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // drag & drop functions
  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === Number(taskId) ? { ...task, status: newStatus } : task
    );

    // save history
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, tasks];
      return newHistory.length > 3 ? newHistory.slice(1) : newHistory;
    });

    setTasks(updatedTasks);
  };

  // undo changes
  const undo = () => {
    if (history.length > 0) {
      setTasks(history[history.length - 1]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  // Add new task
  const addTask = () => {
    if (!newTaskName.trim()) return;

    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      name: newTaskName,
      status: "pending",
    };

    setTasks([...tasks, newTask]);
    setNewTaskName("");
  };

  return (
    <div className="App">
      <h1>Aplicación ToDo</h1>
      <div className="inputs-container">
        <div className="input">
          <label>Añadir nueva tarea</label>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Escribe el nombre de la tarea"
          />
          <button onClick={addTask} className="btn">
            Agregar
          </button>
        </div>

        <div className="input">
          <label>Deshacer ultimo cambio</label>
          <button
            className="btn btn-back"
            onClick={undo}
            disabled={history.length === 0}
          >
            Deshacer
          </button>
        </div>
      </div>

      <div className="tasksboard">
        {statuses.map((status) => (
          <div
            key={status}
            className={`tasksboard-column ${status}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, status)}
          >
            <h2 className="text-lg font-semibold mb-2">
              {status.toUpperCase()}
            </h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <Task
                  key={task.id}
                  title={task.name}
                  id={task.id}
                  onDragStart={onDragStart}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
