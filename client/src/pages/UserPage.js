import React from 'react'
import Profile from '../components/AccountPage/Profile'
import Alert from '../components/AccountPage/Alert'
import History from '../components/AccountPage/History'
import Friends from '../components/AccountPage/Friends'

const UserPage = () => {
  return (
    <div className='container-col'>
      <Profile/>
      <hr/>
      <History/>
      <hr/>
      <Friends/>
    </div>
  )
}

export default UserPage