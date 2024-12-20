import React,{useState, useEffect} from 'react';
import './Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCarousel from '../components/MovieCarousel';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/useUser';



const HomePage = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();
  
  useEffect(() => {
    const storedUsername = user.username
    if (storedUsername) {
    setUsername(storedUsername);
  } else {
    setUsername(null);
  }
  }, [user.username]);


  return (
    <div className="Home">
      <Navbar />
      <div className='content'>
        <div className='container'>
        {username ?(
          <>
          <p className='welcomeuser-text'>Currently logged in as</p>
          <span className='container-in'>{username}</span>
          </>
        ) : (
          <p className='pleaselogin-text'>
            Please <span onClick={() => navigate("/profile")} className="login-link"> log in </span>
            </p>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
