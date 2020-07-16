import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'

const BasicModal = ({ open, handleClose, backAction, title, fullScreen, fullWidth, children }) => {


  return (
    <Dialog 
      onEscapeKeyDown={handleClose}
      open={open}
      fullScreen={fullScreen}
      fullWidth={fullWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={backAction}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BasicModal