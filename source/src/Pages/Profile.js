import React, { useState, useEffect } from 'react'

const Profile = () => {

  const [user, setUser] = useState()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setUser(user)
  }, [])

  return(
    <>
      {user &&
        <div>
          <h2 className="text-center">Welcome {user.username}</h2>
        </div>
      
      }
    </>
  )
}

export default Profile