import React from "react";
import './ProfilePage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteList from "../components/FavoriteList";



function ProfilePage() {
  return (
    <div className="ProfilePage">
      <Navbar />
      <h2>
      <div class="container">
  <h2>User Information</h2>
  <p>Username: <span id="username"></span></p>
  <p>Email: <span id="email"></span></p>
    
  </div>

     <FavoriteList />

      </h2>
      
      <button className="delete-button">Delete account?</button>
      
    </div>
   
  );
}


<Footer />
export default ProfilePage;