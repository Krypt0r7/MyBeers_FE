
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

const CustomSnackBar = (props) => {
  return(
    <Snackbar 
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      autoHideDuration={4000}
      open={props.open}
      onClick={props.close}
      message= {props.prod + props.action}/>
  )
}
export default CustomSnackBar