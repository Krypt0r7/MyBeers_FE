import React from 'react' 
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core'

const RemoveListModal = ({open, handleClose, remove, list}) => {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove {list.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='default' variant='contained' onClick={handleClose}>Cancel</Button>
        <Button color='primary' variant='contained' onClick={remove}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemoveListModal