import React from 'react'
import { Box, TextField, Typography } from '@material-ui/core'

const SystemetProps = ({value, title}) => {

  const textStyle = {
    marginRight: '1em'
  }

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' padding='.5em'>
      <Typography style={textStyle} variant='body2'>{`${title}: `}</Typography>
      <TextField disabled size='small' value={value ? value : ''} />
    </Box>
  )
}

export default SystemetProps