import React from 'react';
import Navbar from '../components/Navbar';
import Authentication from '../components/Authentication/Authentication';
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
      <Authentication/>
    </div>
  );
};

export default LoginPage;
