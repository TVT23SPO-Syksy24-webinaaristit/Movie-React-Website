import React, { useEffect, useState } from "react";
import './ProfilePage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteList from "../components/FavoriteList";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/useUser";

const ProfilePage = () => {
  const {accounts_idaccount} = useParams();
  const { user, fetchUserDetails } = useUser();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = accounts_idaccount || user.id;
        const userDetails = await fetchUserDetails(userId);
        setProfileUser(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [accounts_idaccount, user.id, fetchUserDetails]);

  return (
    <div className="ProfilePage">
      <Navbar />
      <div className="container-userinfo">
        <h2>Viewing {profileUser ? `${profileUser.username}'s` : 'your'} profile</h2>
        <p>Username: <span id="username">{profileUser ? profileUser.username : user.username}</span></p>
        <p>Email: <span id="email">{profileUser ? profileUser.email : user.email}</span></p>
      </div>
      <div className="containerlistbutton">
        <FavoriteList accounts_idaccount={accounts_idaccount} />
      </div>
      <div className="container-deleteaccount">
      <DeleteAccountButton />
      </div>
      <Footer />
    </div>
  );
}



export default ProfilePage;