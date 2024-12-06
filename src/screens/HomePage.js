import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCarousel from '../components/MovieCarousel';

function HomePage() {
  return (
    <div className="Home">
      <Navbar />
      <div className='content'>
      <MovieCarousel />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
