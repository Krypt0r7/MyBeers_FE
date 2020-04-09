import React, { useState, useEffect, useContext } from 'react'
import { TextField, FormControl, Button, Box } from "@material-ui/core"
import { Link } from 'react-router-dom'
import { useMyBeersCommandApi } from '../Services/MyBeersService'
import config from '../config'
import { ErrorContext } from '../Components/Context/ErrorContext'

const Register = (props) =>
{
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setError } = useContext(ErrorContext);
  const { myBeersState, executeCommand } = useMyBeersCommandApi();

  const handleRegister = event =>
  {
    const payload = {
      username, email, password
    }
    const path = `${config.myBeerApiUrl}/user/register`
    executeCommand(path, payload);
    event.preventDefault()
  }

  useEffect(() =>
  {
    if (myBeersState.error)
    {
      setError(myBeersState.error)
    } else if (myBeersState.data)
    {
      props.history.push("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myBeersState])

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="80vh" alignItems="center">
      <form onSubmit={handleRegister}>
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
          <Button type="submit">Register</Button>
        </FormControl>
      </form>
      <Link to="/login">I already have an account!</Link>
    </Box>
  );
}

export default Register