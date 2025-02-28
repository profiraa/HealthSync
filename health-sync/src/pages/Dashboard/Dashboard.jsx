import React, { useState } from "react";
import Popover from "../../components/ui/popover";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "../../styles/button.css";
import Header from "../../components/Header";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboardPage-container">
      <Header className="headerCell" />
      <div className="text-button-group">
        <h1 className="dash">Dashboard</h1>
        <img src="./mobilMenu.svg" alt="" />
        <div className="textContainer">
          <h1>Daily Schedule</h1>
          <p> {selectedDate.toLocaleDateString()}</p>
        </div>
        <div className="calendar">
          <Button onClick={openModal}>
            <CalendarIcon />
          </Button>
        </div>
      </div>
      <div className="sheet"></div>
      <div className="task"></div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
        />
      </Modal>
    </div>
  );
}
