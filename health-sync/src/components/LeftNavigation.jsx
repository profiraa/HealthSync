import React from "react";
import "../styles/leftNavigation.css";
export default function LeftNavigation() {
  return (
    <div className="leftNavigationContainer">
      <div className="topList">
        <div>
          <button>
            <img src="./dashboardIcon.svg" />
            Dashboard
          </button>
        </div>
        <div>
          <button>
            <img src="./appointmentsIcon.svg" /> Appointment
          </button>
        </div>
        <div>
          <button>
            <img src="./doctorIcon.svg" />
            Doctors
          </button>
        </div>
        <div>
          <button><img src="./pentients.svg" />Patients</button>
        </div>
        <div>
          <button><img src="./messages.svg" />Messages</button>
        </div>
        <div>
          <button><img src="./emergency.svg" />Emergency</button>
        </div>
        <div>
          <button><img src="./about.svg" />About</button>
        </div>
      </div>
      <div className="bottomList">
        <div>
          <button>
            <img src="./setting.svg"  />
            Password
          </button>
        </div>
        <div>
          <button>
            <img src="./helpCenter.svg" alt="" /> Help Center
          </button>
        </div>
        <div>
          <button><img src="./logOut.svg" />Logout</button>
        </div>
      </div>
    </div>
  );
}
