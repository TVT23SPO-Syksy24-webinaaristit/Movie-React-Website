import React,{useState, useEffect} from 'react';
import './Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCarousel from '../components/MovieCarousel';

const HomePage = () => {
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
    setUsername(storedUsername);
  } else {
    setUsername("Guest");
  }
  }, []);


  return (
    <div className="Home">
      <Navbar />
      <div className='content'>
        <p>Welcome</p>
        <span>{username}</span>
      <MovieCarousel />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
