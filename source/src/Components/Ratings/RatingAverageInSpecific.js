import React, { useState } from 'react'
import Rating from '@material-ui/lab/Rating'
import { Typography, Box, Tooltip } from '@material-ui/core'

export default ({value, name}) =>
{

  const [open, setOpen] = useState(false);

  const handleOpen = () =>{
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="caption">{name}</Typography>
      <Tooltip title={value} arrow open={open} onClick={handleOpen} onClose={handleClose}>
        <div>
          <Rating size="small" precision={0.1} name="taste" value={value} readOnly />
        </div>
      </Tooltip>
    </Box>
  )
}