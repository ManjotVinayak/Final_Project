import React from 'react'
import Profile from '../components/Profile'
import Meter from '../components/Meter'
import Commits from '../components/Commits'

const Dashboard = () => {
  return (
    <div>
      <Profile />
      <Meter />
      <Commits  />
    </div>
  )
}

export default Dashboard