import React from 'react';
import './Home.css';
import Navbar from '../components/navbar';
import MovieCarousel from '../components/moviecarousel';

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <MovieCarousel />
    </div>
  );
}

export default Home;
