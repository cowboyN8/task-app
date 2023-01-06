import React from "react";

export default function Navbar(props) {
  return (
  <nav className="navbar">
    <h4>Test Nav</h4>
    <div className="points-chip">
      {props.points > 0 ? <h4>{props.points}</h4> : 0}
      <div> Current Points</div>

    </div>
  </nav>
  );
}
