import React, { useState, useContext } from 'react'
import { TextField, FormControl, Button, Box } from "@material-ui/core"
import AuthenticationService from '../Services/AuthenticationService'
import { UserContext } from '../Components/Context/UserContext';

const Login = (props) =>
{

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const { setUser } = useContext(UserContext);

  function handleLogin()
  {

    AuthenticationService.Login(userName, password)
      .then((userInput) =>
      {
        setUser(userInput);
        props.history.push('/');
      })


  }

  return (
    <Box display="flex" justifyContent="center" height="100vh" alignItems="center">
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
    </Box>
  );
}

export default Login