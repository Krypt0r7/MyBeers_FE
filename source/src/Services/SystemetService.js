import config from "../config"
import axios from 'axios'
import { useState, useEffect } from "react"

export const useApiSearch = (manual = false) =>
{
  const [state, setState] = useState({
    data: null,
    error: undefined,
    loading: false
  });

  const requestOptions = {
    method: 'GET'
  }
  const executeSearch = (searchQuery) => {
    setState({...state, loading: true})
    axios.get(searchQuery, requestOptions)
      .then(res => setState({data: res.data, loading: false, error: undefined}))
      .catch(error => setState({data: null, loading: false, error}))
  }

  useEffect(() => {
    !manual && executeSearch()
  }, [executeSearch, manual]);
  
  return [state, executeSearch];
  
}

export const GetSingleBeer = async (id) => {
  const requestOptions = {
    method: 'GET'
  }
  const searchQuery = `${config.myBeerApiUrl}/systemet/${id}`

  const response = await axios.get(searchQuery, requestOptions);
  return response.data;
}