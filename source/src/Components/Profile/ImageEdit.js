import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core'

export default ({open, handleClose, saveImage}) => {
  const [file, setFile] = useState();
  
  const handleSelected = event => {
    const file = event.target.files[0];
    let fr = new FileReader();

    fr.readAsDataURL(file)
    fr.addEventListener("load", (e) => {
      const string = e.target.result.replace("data:image/png;base64,", "");
      setFile(string)
    })

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