import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './GroupPage.css'
import Navbar from '../components/Navbar'
import GroupList from '../components/Groups/GroupList'
import Footer from '../components/Footer'
import GroupCreation from '../components/Groups/GroupCreation'
//        <GroupCreation />
function GroupPage() {
  return (
    <div className="GroupPage">
      <Navbar />
      <GroupList />
      <GroupCreation />
    </div>
  )
}

export default GroupPage;