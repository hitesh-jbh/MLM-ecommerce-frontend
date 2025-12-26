import React from 'react'
import UserProfile from './UserProfile'
import {user} from "../Store/data";
import StatsDashboard from './StatsDashboard';

function Profile() {
  return (
    <div>
        
      <UserProfile user={user} />
    </div>
  )
}

export default Profile
