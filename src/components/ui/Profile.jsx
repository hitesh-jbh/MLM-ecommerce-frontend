import React from 'react'
import UserProfile from './UserProfile'
import {user, accountItems} from "../Store/data";
import StatsDashboard from './StatsDashboard';

function Profile() {
  return (
    <div>
        
      <UserProfile user={user} accItem={accountItems}  />
    </div>
  )
}

export default Profile
