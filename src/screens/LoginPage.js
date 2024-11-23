import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
    navigate('/profile'); // Redirect to profile after login
  };

  return (
    <div>
      <Navbar />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
