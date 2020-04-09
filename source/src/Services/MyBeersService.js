import { authHeader } from '../Helpers/AuthenticationHeader'
import Axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import {ErrorContext} from '../Components/Context/ErrorContext'

export const useQueryApi = (manual = true) =>
{
  const { setError } = useContext(ErrorContext);
  const [queryState, setQueryState] = useState({
    data: null,
    error: undefined,
    loading: false
  });

  
  const executeQuery = (path) =>
  {
    const requestOptions = {
      headers: authHeader()
    }
    setQueryState({ ...queryState, loading: true })
    Axios.get(path, requestOptions)
      .then(res => setQueryState({ data: res.data, loading: false, error: undefined }))
      .catch(error => {
        setQueryState({ data: null, loading: false, error })
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('currentUser')
          window.location.href = "/login"
          setError("You need to login")
        }
      })
  }

  useEffect(() =>
  {
    !manual && executeQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [queryState, executeQuery];

}

export const useMyBeersCommandApi = (manual) => {
  const {setError} = useContext(ErrorContext)
  const [myBeersState, setMyBeersState] = useState({
    data: null,
    error: undefined,
    loading: false
  });
  
  const executeCommand = (path, payLoad) =>
  {
    const authenticationHead = authHeader();
    
    const requestOptions = {
      headers: {...authenticationHead, "Content-Type": "application/json"},
      data: {...payLoad}
    }

    setMyBeersState({ ...myBeersState, loading: true })
    Axios.post(path, {}, requestOptions)
      .then(res => setMyBeersState({ data: res.data, loading: false, error: undefined }))
      .catch(error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('currentUser')
          window.location.href = '/login'
          setError("Need to login")
        }
        error.response && setMyBeersState({ data: null, loading: false, error: error.response.data })
      })
  }

  useEffect(() =>
  {
    !manual && executeCommand()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {myBeersState, executeCommand};
}



