import React, { useEffect, useState } from 'react'

export const UserContext = React.createContext()

export default function UserProvider({ children })
{
  const [user, setUser] = useState();

  useEffect(() =>
  {
    setUser(JSON.parse(localStorage.getItem('currentUser')));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}