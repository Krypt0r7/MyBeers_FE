import React, { useEffect } from 'react'


const Index = () =>
{

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    
  }, [])

  return (
    <div>
      <h2>Home</h2>

    </div>
  )
}


export default Index