import React from 'react'
import {TextField, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const InputTextField = ({value, label, change, name, style}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between"> 
      <TextField 
        style={{...style}}
        fullWidth
        label={label}
        placeholder={`Enter a ${label}`}
        value={value}
        onChange={(event) => change(name, event.target.value)}/>
      <CloseIcon style={{marginLeft: ".5em"}}/>
    </Box>
  )
}

export default InputTextField