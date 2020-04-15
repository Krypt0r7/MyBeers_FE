import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

export default ({show}) => {
  if(!show)
    return null;
  return (
    <Box position="fixed" top="50%" left="50%" marginTop="-45px" marginLeft="-45px" >
      <CircularProgress color="primary" thickness={4.5} size="70px" />
    </Box>
  )
}