import React from "react";
import { GroupDetailsResults } from "../components/GroupDetails/GroupDetailsResults.js";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const GroupDetailsPage = () => {
  

  return (
    <div>
    <Navbar />
    <GroupDetailsResults />
    <Footer />
    </div>
  );
};

export default GroupDetailsPage;
