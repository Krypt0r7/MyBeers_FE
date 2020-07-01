import React, {useState, useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@material-ui/core'

const EditListModal = ({nameProp, descriptionProp, handleClose, open, handleSave}) => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    setName(nameProp)
    setDescription(descriptionProp)
  }, [nameProp, descriptionProp])

  const handleSaveChanges = () => {
    setName("")
    setDescription("")
    handleSave(name, description)
    handleClose()
  }

  const inputStyle = {
    padding: ".5em 0"
  }

  return (
    <Dialog
      onEscapeKeyDown={handleClose}
      open={open}>
        <DialogTitle>Add new list</DialogTitle>
        <DialogContent>
          <Box margin=".5em">
            <TextField 
              style={inputStyle}
              value={name}
              fullWidth
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}/>
            <TextField 
              style={inputStyle}
              value={description}
              multiline
              rowsMax={3}
              fullWidth
              placeholder="Description"
              onChange={(event) => setDescription(event.target.value)}/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save</Button>
        </DialogActions>
    </Dialog>
  )
}

export default EditListModal