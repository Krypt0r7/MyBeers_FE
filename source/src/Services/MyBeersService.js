import { authHeader } from '../Helpers/AuthenticationHeader'
import Axios from 'axios'
import { useEffect, useState } from 'react'

export const useQueryApi = (manual) =>
{

  const [beerState, setState] = useState({
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
    setState({ ...beerState, loading: true })
    Axios.get(path, requestOptions)
      .then(res => setState({ data: res.data, loading: false, error: undefined }))
      .catch(error => setState({ data: null, loading: false, error }))
  }

  useEffect(() =>
  {
    !manual && executeQuery()
  }, [executeQuery, manual]);

  return [beerState, executeQuery];

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
      .catch(error => setState({ data: null, loading: false, error }))
  }

  useEffect(() =>
  {
    !manual && executeUpdate()
  }, [executeUpdate, manual]);

  return {updateState,  executeUpdate};
}



