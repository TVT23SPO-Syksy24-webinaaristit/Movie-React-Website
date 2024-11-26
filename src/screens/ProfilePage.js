import React from "react";
import './ProfilePage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



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
  <div className="favorite-gallery">
     
     <img src="https://cdn.pixabay.com/photo/2023/08/29/20/00/dahlia-8222052_640.jpg"></img>
 </div>

 <div className="favorite-gallery">
     
     <img src="https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg"></img>
 </div>

 <div className="favorite-gallery">
     
     <img src="https://static.vecteezy.com/system/resources/thumbnails/023/041/976/small_2x/glass-globe-ball-with-tree-growing-and-green-nature-blur-background-eco-earth-day-concept-generat-ai-free-photo.jpg"></img>
 </div>

 <div className="favorite-gallery">
     
     <img src="https://jenmulligandesign.com/wp-content/uploads/2017/04/unsplash-free-stock-photos-download.jpg"></img>
 </div>

 <div className="favorite-gallery">
     
     <img src="https://images.gamebanana.com/img/ss/mods/6253d3c235b0f.jpg"></img>
 </div>

 <div className="favorite-gallery">
     
     <img src="https://cdn.pixabay.com/photo/2023/08/29/20/00/dahlia-8222052_640.jpg"></img>
 </div>

 <div className="favorite-gallery">
     
     <img src="https://cdn.pixabay.com/photo/2023/08/29/20/00/dahlia-8222052_640.jpg"></img>
 </div>

    <div className="favorite-gallery">
     
     <img src="https://cdn.pixabay.com/photo/2023/08/29/20/00/dahlia-8222052_640.jpg"></img>
 </div>

   <div className="favorite-gallery">
     
     <img src="https://cdn.pixabay.com/photo/2023/08/29/20/00/dahlia-8222052_640.jpg"></img>
 </div> 

      </h2>
      
      <button className="delete-button">Delete account?</button>
      
    </div>
   
  );
}


<Footer />
export default ProfilePage;