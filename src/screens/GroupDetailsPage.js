import React from "react";
import { GroupDetailsResults } from "../components/GroupDetails/GroupDetailsResults.js";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './GroupDetailsPage.css'
const GroupDetailsPage = () => {
  

  return (
    <div>
      <Navbar />
      <div className="container-groupdetails">
        <GroupDetailsResults />
      </div>
      <Footer />
    </div>
  );
};

export default GroupDetailsPage;
