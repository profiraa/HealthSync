import React, { useState, useEffect } from "react";
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
import { getPatients } from "../../api/fetchPatients";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]);

  useEffect(() => {
    fetchRandomPatients(); // 页面加载时获取随机数据
  }, []);

  const fetchRandomPatients = async () => {
    const data = await getPatients();
    const shuffledData = shuffleArray(data); // 随机打乱数据
    setAllPatients(shuffledData);
    setPatients(sortPatientsByTime(shuffledData)); // 根据时间排序
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5); // 随机打乱数组
  };

  const sortPatientsByTime = (patients) => {
    return patients
      .sort((a, b) => {
        const timeA = new Date(a.registered.date);
        const timeB = new Date(b.registered.date);

        // 获取时间部分（小时和分钟）
        const minutesA = timeA.getHours() * 60 + timeA.getMinutes();
        const minutesB = timeB.getHours() * 60 + timeB.getMinutes();

        return minutesA - minutesB; // 按照时间升序排序
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchRandomPatients(); // 每次选择日期时，重新获取随机数据
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
          <Button onClick={() => setIsModalOpen(true)}>
            <CalendarIcon />
          </Button>
        </div>
      </div>
      <div className="sheet">
        <div className="sheetHead">
          <ul>
            <li>Time</li>
            <li>Name</li>
            <li>Personal File</li>
            <li>Actions</li>
          </ul>
        </div>
        <ul className="patients">
          {patients.length > 0 ? (
            patients.map((user, index) => (
              <li key={index} className="patient-card">
                {new Date(user.registered.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <div>
                  {user.name.first} {user.name.last}
                </div>
                <img src="./send-sqaure.png" alt="" />
                <div className="small-icons">
                  <img src="./note.png" alt="" />
                  <img src="./ashbin.png" alt="" />
                </div>
              </li>
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "20px" }}>
              No data available
            </p>
          )}
        </ul>
      </div>
      <div className="task"></div>

      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
      </Modal>
    </div>
  );
}
