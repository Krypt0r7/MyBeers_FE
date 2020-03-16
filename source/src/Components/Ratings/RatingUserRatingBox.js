import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

export default ({name, label, rating, editable, setState}) =>
{
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography style={{ marginRight: ".5em" }}>{label}</Typography>
      {!editable ?
        <Rating name={name} value={rating} />
        :
        <Rating name={name} defaultValue={rating} onChange={(event) => setState(name, event.target.value)}/>
      }
    </Box>
  )
}