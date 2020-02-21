import React, { useContext } from 'react'
import { ErrorContext } from '../Context/ErrorContext'
import Snackbar from '@material-ui/core/Snackbar'

const ErrorSnackbar = () => 
{

  const { error, setError } = useContext(ErrorContext)

  const handleClick = () => {
    setError(null)
  }

  return (
    error &&
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
        open={error ? true : false}
        message={error && error}
        onClick={handleClick} />
  )
}

export default ErrorSnackbar