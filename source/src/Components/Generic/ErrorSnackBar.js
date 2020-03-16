import React, { useContext } from 'react'
import { ErrorContext } from '../Context/ErrorContext'
import Snackbar from '@material-ui/core/Snackbar'

const ErrorSnackbar = () => 
{

  const { error, setError } = useContext(ErrorContext)
  
  const handleClose = () => {
    setError(null)
  }

  return (
    error &&
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        open={error ? true : false}
        message={error && error}
        onClose={handleClose}
        onClick={handleClose} />
  )
}

export default ErrorSnackbar