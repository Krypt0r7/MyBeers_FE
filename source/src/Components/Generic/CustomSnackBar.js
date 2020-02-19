
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

const CustomSnackBar = (props) => {
  return(
    <Snackbar 
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      autoHideDuration={4000}
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
      message= {props.prod + props.action}/>
  )
}
export default CustomSnackBar