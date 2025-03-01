import React, { useState, useEffect } from "react";
import Popover from "../../components/ui/popover";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
import "./Dashboard.css";
import "../../styles/button.css";
import Header from "../../components/Header";
import { getPatients } from "../../api/fetchPatients";
import Pagination from "../../components/Pagination";
import PatientForm from "../../components/PatientForm";




export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPatients, setAllPatients] = useState({}); //Store paginated data
  const [patients, setPatients] = useState([]); //Current page data
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = 5;

  useEffect(() => {
    fetchRandomPatients();
  }, []); // Get data when page loads

  const fetchRandomPatients = async () => {
    const data = await getPatients();
    const shuffledData = shuffleArray(data);
    const sortedData = sortPatientsByTime(shuffledData);
    const paginatedData = paginateData(sortedData, pageSize); // Paginate

    setAllPatients(paginatedData);
    setPatients(paginatedData[currentPage] || []); // Set current page data
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5); //Copy the array and scramble it
  };

  const sortPatientsByTime = (patients) => {
    return [...patients].sort((a, b) => {
      const timeA = new Date(a.registered.date);
      const timeB = new Date(b.registered.date);
      return (
        timeA.getHours() * 60 +
        timeA.getMinutes() -
        (timeB.getHours() * 60 + timeB.getMinutes())
      );
    });
  };

  const paginateData = (data, size) => {
    let paginated = {};
    for (let i = 1; i <= totalPages; i++) {
      paginated[i] = data.slice((i - 1) * size, i * size);
    }
    return paginated;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
    fetchRandomPatients();
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPatients(allPatients[page] || []);
  };
  console.log({ currentPage });
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
        <div className="paginationContainer">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div className="task">
        <h1> Add Your Task To The Schedule </h1>
        <div className="taskContent">
          <div className="taskLists">
            <input
              type="text"
              className="taskItem"
              placeholder="Patient's Name"
            />
            <input
              type="text"
              className="taskItem"
              placeholder="Patient's Personal Number"
            />
            <input type="text" className="taskItem" placeholder="Date & Hour" />
          </div>
          <div className="medicalJournal">
            <img className="attachIcon"  src="./attach_file.png" alt="" />
            <h1 className="medicalText">Medical Journal</h1>
          </div>
        </div>
        <button className="button bashboard-button">Add</button>
      </div>

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
