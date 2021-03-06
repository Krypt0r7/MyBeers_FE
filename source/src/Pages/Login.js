import React, { useState, useEffect, useContext } from 'react'
import { TextField, FormControl, Button, Box } from "@material-ui/core"
import { useMyBeersCommandApi } from '../Services/MyBeersService'
import { Link } from 'react-router-dom';
import config from '../config';
import { ErrorContext } from '../Components/Context/ErrorContext'


const Login = (props) =>
{

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { myBeersState, executeCommand } = useMyBeersCommandApi();
  const { setError } = useContext(ErrorContext)

  const handleLogin = event =>
  {
    const payload = { username, password }
    const path = `${config.myBeerApiUrl}/user/authenticate`
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
      localStorage.setItem("currentUser", JSON.stringify(myBeersState.data))
      props.history.goBack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myBeersState])

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="85vh" alignItems="center">
      <form onSubmit={handleLogin}>
        <FormControl>
          <TextField
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
            type="text" />
          <TextField
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            type="password" />
          <Button type="submit">Sign in</Button>
        </FormControl>
      </form>
      <Link to="/register">I don't have an account!</Link>
    </Box>
  );
}

export default Login