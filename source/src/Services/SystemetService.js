import config from "../config"
import axios from 'axios'

export const ApiSearch = async (searchPhrase) =>
{
  const requestOptions = {
    method: 'GET'
  }
  const searchQuery = `${config.myBeerApiUrl}/systemet?search=${searchPhrase}`
  const response = await axios.get(searchQuery, requestOptions);
  
  return response.data;
  
}

export const GetSingleBeer = async (id) => {
  const requestOptions = {
    method: 'GET'
  }
  const searchQuery = `${config.myBeerApiUrl}/systemet/${id}`

  const response = await axios.get(searchQuery, requestOptions);
  return response.data;
}