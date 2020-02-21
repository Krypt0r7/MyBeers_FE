import { authHeader } from '../Helpers/AuthenticationHeader'
import { HandleResponse } from '../Helpers/HandleResponse'
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


export const SaveBeer = (prodNumber) => {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader()
  }

  return fetch(`${config.myBeerApiUrl}/user/add-beer?productNumber=${prodNumber}`, requestOptions)
    .then(HandleResponse)
}

export const RemoveBeer = (beerId) => {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader()
  }
  return fetch(`${config.myBeerApiUrl}/user/remove-beer?beerId=${beerId}`, requestOptions)
    .then(HandleResponse)

}
