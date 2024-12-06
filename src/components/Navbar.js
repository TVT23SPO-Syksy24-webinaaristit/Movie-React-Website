import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import LogOutButton from './LogOutButton';
import { ThemeContext } from '../contexts/ThemeContext';
import user_icon from './Assets/person.png';
import Flag from 'react-world-flags';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);
  const [isPfpDropDownOpen, setIsPfpDropDownOpen] = useState(false);
  const { theme, toggleTheme} = useContext(ThemeContext);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
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
      <div className="burger-menu" onClick={toggleDropdown}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      


      {isDropdownOpen && (
        <div className="dropdown" onMouseLeave={toggleDropdown}>
          <button className="dropdown-btn" onClick={() => navigate("/")}>Home</button>
          <button className="dropdown-btn" onClick={() => navigate("/movies")}>Movies</button>
          <button className="dropdown-btn" onClick={() => navigate("/screenings")}>Screenings</button>
          <button className="dropdown-btn"onClick={() => navigate("/groups")}>Groups</button>
          <button className="dropdown-btn" onClick={() => navigate("/profile")}>Profile</button>
          
        </div>
      )}

      <div className="right-icons">
        

        <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "☀️" : "🌙"}
        </button>
        
        <div
          className="flag-dropdown" 
          onClick={toggleFlagDropdown}
          onMouseLeave={() => setIsFlagDropdownOpen(false)}
        >
          <Flag code="gb" height="16"
          />
          {isFlagDropdownOpen && (
            <div className="flag-options">
              <Flag code="gb" height="16" onClick={() => navigate("/en")} />
              <Flag code="es" height="16" onClick={() => navigate("/es")} />
              <Flag code="fr" height="16" onClick={() => navigate("/fr")} />
              <Flag code="de" height="16" onClick={() => navigate("/de")} />
            </div>
          )}
        </div>
        
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
