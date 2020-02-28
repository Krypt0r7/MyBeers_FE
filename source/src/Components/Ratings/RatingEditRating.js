import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Input, useMediaQuery } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import {useTheme} from '@material-ui/core/styles'

export default ({open, handleClose, rating, handleSave}) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle>Edit your rating</DialogTitle>
      <DialogContent>
        <Rating defaultValue={rating && rating.overallRating}/>
        <Input type="text"/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}