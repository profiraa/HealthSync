import React from "react";
// import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "../../styles/button.css";
import Header from "../../components/Header";

export default function Dashboard() {
  return (
    <div className="dashboardPage-container">
      <Header className="headerCell" />
      <div className="text-button-group">
        <h1 className="dash">Dashboard</h1>
        <img src="./mobilMenu.svg" alt="" />
        <div className="textContainer">
          <h1>Today's Schedule</h1>
          <p> 13/08/2024</p>
        </div>
        <div className="calendar">
            <input type="text" />
        </div>
      </div>
      <div className="sheet"></div>
      <div className="task"></div>
    </div>
  );
}
