import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import LogOutButton from './LogOutButton';
import { ThemeContext } from '../contexts/ThemeContext';
import user_icon from './Assets/person.png';
import Flag from 'react-world-flags';
import { useUser } from '../contexts/useUser';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);
  const [isPfpDropDownOpen, setIsPfpDropDownOpen] = useState(false);
  const { theme, toggleTheme} = useContext(ThemeContext);
  const [username, setUsername] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = user.username;
    if (storedUsername) {
    setUsername(storedUsername);
  } else {
    setUsername("Guest");
  }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleFlagDropdown = () => {
    setIsFlagDropdownOpen(!isFlagDropdownOpen);
  }

  const togglePfpDropdown = () => {
    setIsPfpDropDownOpen(!isPfpDropDownOpen);
  }


  return (
    <div className="navbar">
      <div className="logo"
      onClick={() => navigate("/")}>
        <h1>WebPolyFilms</h1>
      </div>
      {/* Navigation Links */}
      <div className="nav-links">
        <button className="nav-btn" onClick={() => navigate("/movies")}>Movies</button>
        <button className="nav-btn" onClick={() => navigate("/screenings")}>Screenings</button>
        <button className="nav-btn" onClick={() => navigate("/groups")}>Groups</button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>Profile</button>
      </div>

      <div className="right-icons">
        

        <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "☀️" : "🌙"}
        </button>
        
        <div className="user-icon"  onClick={togglePfpDropdown}>
          <img src={user_icon} alt="user_icon"/>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {isPfpDropDownOpen && (
          <div className="dropdown_profile" onMouseLeave={togglePfpDropdown}>
          <div className="dropdown-profile-content"  onClick={() => navigate("/profile")}>
          <img src={user_icon} alt="user_icon"/>
          <span>{username || "Guest"}</span> {/* Default to "Guest" if username is not available */}
          </div>
          <LogOutButton/>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
