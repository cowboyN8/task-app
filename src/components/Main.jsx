import React from "react";
import EmptyState from "../assets/empty-state.svg";
import Skeleton from "@mui/material/Skeleton";

export default function Main(props) {



  return (
    <div className="main">
      {props.taskList.length ? (
        <div className="task-grid">{props.taskList ? props.taskList : <Skeleton variant="rectangular" width={210} height={118} />}</div>
      ) : (
        <div className="empty-state">
          <div className="image-title">
            <div className="empty-title">No Tasks...yet</div>
            <img src={EmptyState} alt="" className="ghost-img" /> 
          </div>
          

        </div>
      )}
    </div>
  );
}

