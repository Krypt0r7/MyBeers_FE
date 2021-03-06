import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default ({ component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => (
      localStorage.getItem('currentUser')
        ? <Component {...props} />
        : <Redirect to='/login' />
    )}/>
  )
}