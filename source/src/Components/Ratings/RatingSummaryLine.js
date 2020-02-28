import React from 'react'
import { Box, Typography, LinearProgress } from '@material-ui/core'

export default ({number, value}) =>
{
  const linearProgressStyle = {
    width: "85%",
    height: "10px"
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center">
      <Typography variant="caption">{number}</Typography>
      <LinearProgress style={linearProgressStyle} value={value * 100} variant="determinate" color="secondary" />
    </Box>
  )
}