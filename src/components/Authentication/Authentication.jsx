import React, { useState } from 'react'
import axios from 'axios'
import './Authentication.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const Authentication = () => {
  const [action, setAction] = useState("Log In");
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
  });

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
          ...prev,
          [name]: value,
      }));
  };

  const handleSubmit = async () => {
      try {
          if (action === "Log In") {
              const response = await axios.post("http://localhost:3001/login", {
                  email: formData.email,
                  password: formData.password,
              });
              const { token } = response.data;

              // Save token securely
              localStorage.setItem("authToken", token);

              alert("Login successful!");
              window.location.href = "/";
          } else if (action === "Sign Up") {
              const response = await axios.post("http://localhost:3001/signup", {
                  name: formData.name,
                  email: formData.email,
                  password: formData.password,
              });

              alert("Sign Up successful!");
              setAction("Log In"); // Switch to Log In view
          }
      } catch (error) {
          console.error(`${action} failed:`, error.response?.data?.message || error.message);
          alert(`${action} failed: ${error.response?.data?.message || error.message}`);
      }
  };

  const handleActionClick = (currentAction) => {
      if (action === currentAction) {
          handleSubmit(); // Submit form if the clicked action matches the current action
      } else {
          setAction(currentAction); // Switch views otherwise
      }
  };

  return (
      <div className="container">
          <div className="header">
              <div className="text">{action}</div>
              <div className="underline"></div>
          </div>
          <div className="inputs">
              {action === "Sign Up" && (
                  <div className="input">
                      <img src={user_icon} alt="User Icon" />
                      <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleInputChange}
                      />
                  </div>
              )}
              <div className="input">
                  <img src={email_icon} alt="Email Icon" />
                  <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                  />
              </div>
              <div className="input">
                  <img src={password_icon} alt="Password Icon" />
                  <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                  />
              </div>
          </div>
          {action === "Log In" && (
              <div className="forgot-password">
                  Forgot Password? <span>Click Here</span>
              </div>
          )}
          <div className="submit-container">
              <div
                  className={action === "Log In" ? "submit gray" : "submit"}
                  onClick={() => handleActionClick("Sign Up")}
              >
                  Sign Up
              </div>
              <div
                  className={action === "Sign Up" ? "submit gray" : "submit"}
                  onClick={() => handleActionClick("Log In")}
              >
                  Log In
              </div>
          </div>
      </div>
  );
};
export default Authentication