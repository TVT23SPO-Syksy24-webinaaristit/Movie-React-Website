import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setIsThemeDark(!isThemeDark);
    document.body.classList.toggle('dark-theme', !isThemeDark);
  };

  return (
    <div className="navbar">
      <div className="burger-menu" onClick={toggleDropdown}>
        <span></span>
        <span></span>
        <span></span>
      </div>


      {isDropdownOpen && (
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => navigate("/")}>Home</button>
          <button className="dropdown-btn" onClick={() => navigate("/movies")}>Movies</button>
          <button className="dropdown-btn" onClick={() => navigate("/screenings")}>Screenings</button>
          <button className="dropdown-btn"onClick={() => navigate("/groups")}>Groups</button>
          <button className="dropdown-btn">Profile</button>
        </div>
      )}

      <div className="right-icons">
        <div className="profile-icon">
          <img alt="Profile" />
        </div>
        
        <button className="theme-toggle" onClick={toggleTheme}>
          {isThemeDark ? '🌙' : '☀️'}
        </button>
        
        <div
          className="flag-dropdown"
          onMouseEnter={() => setIsFlagDropdownOpen(true)}
          onMouseLeave={() => setIsFlagDropdownOpen(false)}
        >
          <img alt="Language" className="flag-icon" />
          {isFlagDropdownOpen && (
            <div className="flag-options">
              <img  alt="English" />
              <img  alt="Finnish" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
