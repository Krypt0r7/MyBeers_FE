import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
// import {useTheme} from '@material-ui/core/styles'

export default ({open, handleClose, rating, handleSave}) => {

  const [theRating, setTheRating] = useState();
  const [theDesciption, setTheDescription] = useState();

  useEffect(() => {
    rating && setTheRating(rating.overallRating)
    rating && setTheDescription(rating.description)
  }, [rating])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit your rating</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <Rating 
            name="theRating" 
            defaultValue={rating && rating.overallRating} 
            onChange={(event) => setTheRating(event.target.value)}/>
          <TextField 
            variant="outlined" 
            multiline 
            rows="4" 
            defaultValue={rating && rating.description} 
            onChange={(event) => setTheDescription(event.target.value)}/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSave(theRating, theDesciption)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}