import { authHeader } from '../Helpers/AuthenticationHeader'
import Axios from 'axios'
import { useEffect, useState } from 'react'

export const useMyBeersApi = (manual, method) => {

  const [beerState, setState] = useState({
    data: null,
    error: undefined,
    loading: false
  });

  const requestOptions = {
    method,
    headers: authHeader()
  }
  const executeQuery = (path) => {
    setState({...beerState, loading: true})
    Axios.get(path, requestOptions)
      .then(res => setState({data: res.data, loading: false, error: undefined}))
      .catch(error => setState({data: null, loading: false, error}))
  }

  useEffect(() => {
    !manual && executeQuery()
  }, [executeQuery, manual]);
  
  return [beerState, executeQuery];
  
}
