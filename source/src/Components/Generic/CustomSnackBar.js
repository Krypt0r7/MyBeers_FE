
import React from 'react'
import { Snackbar, IconButton } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'


const CustomSnackBar = (props) =>
{
  return(
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={props.open}
      autoHideDuration={2000}
      message={props.message + ' was added'}
      action={
        <React.Fragment>
          <IconButton size='small' color='inherit' onClick={() => props.close(false)}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </React.Fragment>
      }>

    </Snackbar>
  )}

export default CustomSnackBar