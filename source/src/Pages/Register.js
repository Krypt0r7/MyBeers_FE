import React, {useState} from 'react'
import { TextField, FormControl, Button, Box } from "@material-ui/core"
import {Link} from 'react-router-dom'
import AuthenticationService from '../Services/AuthenticationService'


const Register = (props) =>
{
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = () => {
    AuthenticationService.register(username, email, password)
      .then(() => {
        props.history.push('/login');
      })

  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="80vh" alignItems="center">
      <FormControl>
        <TextField
          onChange={(event) => setUsername(event.target.value)}
          label="Username"
          type="text" />
        <TextField
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          type="text" />
        <TextField
          onChange={(event) => setPassword(event.target.value)}
          label="Password"
          type="password" />
        <Button onClick={handleRegister}>Register</Button>
      </FormControl>
      <Link to="/login">I already have an account!</Link>
    </Box>
  );
}

export default Register