import React, { useState, useEffect } from "react";
import "./ScreeningsPage.css";
import Navbar from "../components/Navbar";
import ScreeningResults from "../components/Screenings/ScreeningResults";
import Footer from "../components/Footer";

function ScreeningsPage() {
  const [showButton, setShowButton] = useState(false);

  // Handle scroll to toggle button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="ScreeningsPage">
      <Navbar />
      <div className="content">
        <ScreeningResults />
      {showButton && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑ Back to Top
        </button>
      )}
        </div>
      <Footer />
    </div>
  );
}

export default ScreeningsPage;
