import { authHeader } from '../Helpers/AuthenticationHeader'
import Axios from 'axios'
import { useEffect, useState } from 'react'

export const useQueryApi = (manual = true) =>
{

  const [queryState, setQueryState] = useState({
    data: null,
    error: undefined,
    loading: false
  });

  
  const executeQuery = (path) =>
  {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    setQueryState({ ...queryState, loading: true })
    Axios.get(path, requestOptions)
      .then(res => setQueryState({ data: res.data, loading: false, error: undefined }))
      .catch(error => {
        setQueryState({ data: null, loading: false, error })
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('currentUser')
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

export const useUpdateApi = (manual) => {
  const [updateState, setState] = useState({
    data: null,
    error: undefined,
    loading: false
  });
  
  const executeUpdate = (path) =>
  {
    const requestOptions = {
      method: 'PUT',
      headers: authHeader()
    }
    setState({ ...updateState, loading: true })
    Axios.put(path, {}, requestOptions)
      .then(res => setState({ data: res.data, loading: false, error: undefined }))
      .catch(error => {
        setState({ data: null, loading: false, error })
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('currentUser')
        }
      })
  }

  useEffect(() =>
  {
    !manual && executeUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {updateState,  executeUpdate};
}



