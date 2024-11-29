import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCarousel from '../components/MovieCarousel';

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <MovieCarousel />
      <Footer />
    </div>
  );
}

export default Home;
