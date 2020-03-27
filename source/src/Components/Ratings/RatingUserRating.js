import React, { useState } from 'react'
import { Box, Avatar, Typography, Tooltip } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import moment from 'moment'

export default ({ username, rating, created }) =>
{
  const [open, setOpen] = useState(false);  
  const data = rating && `Value: ${rating.value}<br/> Taste: ${rating.taste}`

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false)
  }
  const formatDate = (date) =>
  {
    return (
      moment(date).format('DD-MM-YYYY')
    )
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Avatar />
      <Typography>{username}</Typography>
      <Typography variant="caption">{formatDate(created)}</Typography>
      
      <Tooltip title={rating.overallRating} open={open} onClose={handleClose} onClick={handleOpen} arrow>
        <div>
          <Rating size="small" name="myrating" precision={0.1} value={rating.overallRating} max={5} readOnly/>  
        </div>
      </Tooltip>
    </Box>
  )
}