import React from "react";
import './ProfilePage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteList from "../components/FavoriteList";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/useUser";

const ProfilePage = () => {
  const {accounts_idaccount} = useParams();
  const { user } = useUser();

  return (
    <div className="ProfilePage">
      <Navbar />
      <div className="container">
        <h2>User Information</h2>
        <p>Username: <span id="username">{user.username}</span></p>
      </div>
      <div className="containerlistbutton">
        <FavoriteList accounts_idaccount={accounts_idaccount}/>
        <DeleteAccountButton />
      </div>
      <Footer />
    </div>
  );
}


export default ProfilePage;