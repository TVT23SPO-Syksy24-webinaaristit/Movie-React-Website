import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);

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

      <input type="text" className="search-field" placeholder="search..." />

      {isDropdownOpen && (
        <div className="dropdown">
          <button className="dropdown-btn">Home</button>
          <button className="dropdown-btn">Movies</button>
          <button className="dropdown-btn">Groups</button>
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