import React, { useState } from 'react'
import { TextField, FormControl, Button, Box } from "@material-ui/core"
import AuthenticationService from '../Services/AuthenticationService'
import { Link } from 'react-router-dom';

const Login = (props) =>
{

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  function handleLogin()
  {

    AuthenticationService.Login(userName, password)
      .then((userInput) =>
      {
        props.history.push('/');
      })


  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="85vh" alignItems="center">
      <FormControl>
        <TextField
          onChange={(event) => setUserName(event.target.value)}
          label="Username"
          type="text" />
        <TextField
          onChange={(event) => setPassword(event.target.value)}
          label="Password"
          type="password" />
        <Button onClick={handleLogin} >Sign in</Button>
      </FormControl>
      <Link to="/register">I don't have an account!</Link>
    </Box>
  );
}

export default Login