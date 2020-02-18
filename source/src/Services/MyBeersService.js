import {authHeader} from '../Helpers/AuthenticationHeader'
import {HandleResponse} from '../Helpers/HandleResponse'
import config from '../config'

export const GetMyBeers = () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }  

  return fetch(`${config.myBeerApiUrl}/beer`, requestOptions)
    .then(HandleResponse)
    .then(beers => {
      return beers
    })
}

export const ToggleFavourite = (id) => {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader()
  }

  return fetch(`${config.myBeerApiUrl}/beer/${id}`, requestOptions)
    .then(HandleResponse)
    .then(beer => {
      return beer
    })
}

export const SaveBeer = (prodNumber) => {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  }

  return fetch(`${config.myBeerApiUrl}/beer/byProd?productNumber=${prodNumber}`, requestOptions)
    .then(HandleResponse)
    .then(beer => {
      return beer;
    })
}
