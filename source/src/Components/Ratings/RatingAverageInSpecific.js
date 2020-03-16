import React from 'react'
import Rating from '@material-ui/lab/Rating'
import { Typography, Box } from '@material-ui/core'

export default ({value, name}) =>
{
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="caption">{name}</Typography>
      <Rating size="small" precision={0.1} name="taste" value={value} readOnly />
    </Box>
  )
}