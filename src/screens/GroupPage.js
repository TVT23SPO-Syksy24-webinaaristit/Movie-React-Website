//src/screens/GroupPage.js
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './GroupPage.css'
import Navbar from '../components/Navbar'
import GroupList from '../components/Groups/GroupList'
import Footer from '../components/Footer'
import GroupCreation from '../components/Groups/GroupCreation'
import { GroupProvider } from '../contexts/GroupProvider'


const GroupPage = () => {
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  const handleGroupCreated = () => {
    setRefresh(!refresh); // Toggle to refresh the group list
  };

  return (
    <GroupProvider>  {/* Wrap GroupPage with GroupProvider */}
      <div className="GroupPage">
        <Navbar />
        <GroupList refresh={refresh} setRefresh={setRefresh} />
        <GroupCreation onGroupCreated={handleGroupCreated} />
      </div>
      <Footer />
    </GroupProvider>
  );
}

export default GroupPage;