import "./Login.css";
import "../../styles/button.css";
import { useState } from "react";

export default function Login() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, 6);
    setValue(newValue);
  };

  return (
    <div className="page-container2">
    
      <div className="head-text">
        <h1>Login</h1>
        <p>Welcome! Please login to your account.</p>
      </div>

      <div className="inputBox">
        <h3>Enter Your Unique Number:</h3>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="000000"
          maxLength="6"
        />
        <h3>Enter the card.</h3>
      </div>
      <button className="button">
        LOGIN</button>
    </div>
  );
}
