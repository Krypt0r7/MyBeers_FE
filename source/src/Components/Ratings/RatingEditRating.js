import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@material-ui/core'
import RatingUserRatingBox from './RatingUserRatingBox';
// import {useTheme} from '@material-ui/core/styles'

export default ({open, handleClose, rating, handleSave}) => {

  const [theRating, setTheRating] = useState(rating);

  const handleChange = (name, value) => {
    setTheRating({...theRating, [name]: value})
  }

  useEffect(() => {
    rating && setTheRating({
      taste: rating.taste,
      afterTaste: rating.afterTaste,
      chugability: rating.chugability,
      value: rating.value,
      firstImpression: rating.firstImpression,
      description: rating.description
    })
  }, [rating])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit your rating</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <RatingUserRatingBox 
            label="Taste"
            name="taste"
            rating={rating && rating.taste} 
            setState={handleChange}
            editable={true}/>
          <RatingUserRatingBox 
            label="Aftertaste" 
            name="afterTaste"
            rating={rating && rating.afterTaste} 
            setState={handleChange}
            editable={true}/>
          <RatingUserRatingBox 
            label="Chugability" 
            name="chugability"
            rating={rating && rating.chugability} 
            setState={handleChange}
            editable={true}/>
          <RatingUserRatingBox 
            label="Value" 
            name="value"
            rating={rating && rating.value} 
            setState={handleChange}
            editable={true}/>
          <RatingUserRatingBox 
            label="First impression" 
            name="firstImpression"
            rating={rating && rating.firstImpression}
            setState={handleChange}
            editable={true}/>
          <TextField 
            variant="outlined"
            label="Comment"
            multiline 
            rows="4" 
            defaultValue={rating && rating.description} 
            onChange={(event) => handleChange("description", event.target.value)}/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSave(theRating)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}