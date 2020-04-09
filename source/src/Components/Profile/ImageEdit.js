import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core'

export default ({open, handleClose, saveImage}) => {
  const [file, setFile] = useState();
  
  const handleSelected = event => {
    setFile(event.target.files[0]);
    
  }

  const handleSave = () => {
    saveImage(file)
    handleClose();
  }

  return (
    <Dialog
      open={open}
      fullWidth>
      <DialogTitle>Change avatar image</DialogTitle>
      <DialogContent>
        <DialogContentText>Change the avatar image by selecting a new image</DialogContentText>
        <input type="file" accept="image/png" onChange={handleSelected} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}