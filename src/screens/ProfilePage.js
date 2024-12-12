import React from "react";
import './ProfilePage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteList from "../components/FavoriteList";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { useUser } from "../contexts/useUser";

const ProfilePage = () => {
  const { user } = useUser();
  return (
    <div className="ProfilePage">
      <Navbar />
      <div className="container">
        <h2>User Information</h2>
        <p>Username: {user.username}</p>
      </div>
      <div className="containerlistbutton">
        <FavoriteList />
        <DeleteAccountButton />
      </div>
      <Footer />
    </div>
  );

}

export default ProfilePage;