import React from "react";

export default function Task(props) {
  return (
    <div className="task-card">
      <div className="header-topbar">
        <div className="task-name">{props.name}</div>
        <div className="points">{props.points}</div>
      </div>

      <div className="info-wrapper">
        <div>{props.description}</div>
        <div className="category">{props.category}</div>
        <div className="date">{props.date}</div>
      </div>
      <button onClick={() => props.deleteTask(props.id)}>Delete Task</button>
    </div>
  );
}