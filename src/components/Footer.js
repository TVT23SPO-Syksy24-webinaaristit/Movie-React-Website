import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-branding">
          <h3>WebPolyFilms</h3>
          <p>Your go-to website for movies and more! </p>
          <br></br>
        </div>
        <div className="footer-links">
          <h4>Credits</h4>
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"></img>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <ul>
            <li><a href="https://github.com/TVT23SPO-Syksy24-webinaaristit">Github Project</a></li>
          </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} WebPolyFilms. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
