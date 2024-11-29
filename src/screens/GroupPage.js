import React from 'react'
import './GroupPage.css'
import Navbar from '../components/Navbar'
import GroupList from '../components/GroupList'
import Footer from '../components/Footer'

function GroupPage() {
  return (
    <div className="GroupPage">
      <Navbar />
        <GroupList />
    </div>
  )
}

export default GroupPage;