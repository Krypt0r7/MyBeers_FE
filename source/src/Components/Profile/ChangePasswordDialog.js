import React, { useState, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'
import {ErrorContext} from '../Context/ErrorContext'
import { useMyBeersCommandApi } from '../../Services/MyBeersService';
import config from '../../config';


export default ({open, handleClose, userId}) => {

  const [password, setPassword] = useState();
  const [passwordMatch, setPasswordMatch] = useState();
  const {executeCommand} = useMyBeersCommandApi();

  const {setError} = useContext(ErrorContext);

  const handleSave = () => {
    if (password === passwordMatch) {
      executeCommand(`${config.myBeerApiUrl}/user/updatepassword`, {id: userId, password});
      handleClose();
    }else{
      setError("Password doesn't match")
    }
  }


  return (
    <Dialog 
      open={open}
      fullWidth>
      <DialogTitle>Change password</DialogTitle>
      <DialogContent>
        <DialogContentText>Type password in both fields to change the password</DialogContentText>
        <TextField 
          placeholder="Type password"
          fullWidth 
          type="password" 
          variant="outlined" 
          style={{marginBottom: "1em"}}
          onChange={(event) => setPassword(event.target.value)} />
        <TextField 
          placeholder="Password again"
          fullWidth 
          type="password"
          variant="outlined" 
          onChange={(event) => setPasswordMatch(event.target.value)}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} >Cancel</Button>
        <Button onClick={handleSave}>Change password</Button>
      </DialogActions>
    </Dialog>
  )
}