import React from "react";
import "./Task.css";

const Task = ({ title, id,  onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className="task"
    >
      {title}
    </div>
  );
};

export default Task;