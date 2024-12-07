import React from "react";
import './ProfilePage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteList from "../components/FavoriteList";
import DeleteAccountButton from "../components/DeleteAccountButton";



function ProfilePage() {
  return (
    <div className="ProfilePage">
      <Navbar />
      <h2>
      <div class="container">
  <h2>User Information</h2>
  <p>Username: <span id="username"></span></p>
  </div>

     <FavoriteList />

      </h2>
      
      <DeleteAccountButton />
      <Footer />
    </div>
  );
}

export default ProfilePage;