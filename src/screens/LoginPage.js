import React from 'react';
import Navbar from '../components/Navbar';
import Authentication from '../components/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  return (
    <div>
      <Navbar />
      <Authentication/>
    </div>
  );
};

export default LoginPage;
