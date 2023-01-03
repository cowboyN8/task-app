import React from "react";
import EmptyState from "../assets/empty-state.svg";

export default function Main(props) {
  return (
    <div className="main">
      {props.taskList.length ? (
        <div className="task-grid">{props.taskList}</div>
      ) : (
        <div className="empty-state">
          <div className="empty-title">No Tasks...yet</div>
          <img src={EmptyState} alt="" className="ghost-img" />
        </div>
      )}
    </div>
  );
}

