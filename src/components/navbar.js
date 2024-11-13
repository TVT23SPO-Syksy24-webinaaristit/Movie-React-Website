import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    </div>
  );
};

export default Navbar;
