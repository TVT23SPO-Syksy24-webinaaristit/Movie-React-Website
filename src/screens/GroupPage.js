import React from 'react'
import './GroupPage.css'
import Navbar from '../components/Navbar'
import GroupList from '../components/Groups/GroupList'
import Footer from '../components/Footer'
import GroupCreation from '../components/Groups/GroupCreation'

function GroupPage() {
  return (
    <div className="GroupPage">
      <Navbar />
        <GroupList />
        {/* <GroupCreation /> */}

    </div>
  )
}

export default GroupPage;