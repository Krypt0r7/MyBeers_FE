import HandleResponse from '../Helpers/HandleResponse'
import config from '../config'


const register = (username, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, email, password })
  }

  return fetch(`${config.myBeerApiUrl}/user/register`, requestOptions)
    .then(HandleResponse)
    .then(user => {
      return user;
    })

}

function Login(username, password)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json ' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${config.myBeerApiUrl}/user/authenticate`, requestOptions)
    .then(HandleResponse)
    .then(user =>
    {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    });
}

function Logout()
{
  localStorage.removeItem('currentUser');
}


export default {
  Login,
  Logout,
  register
};