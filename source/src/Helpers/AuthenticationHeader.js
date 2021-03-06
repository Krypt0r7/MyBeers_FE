import config from '../config'

export const authHeader = () => 
{
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (currentUser && currentUser.token)
  {
    return { 'Authorization': `Bearer ${currentUser.token}` };
  } else
  {
    return [];
  }
}

export const multiPartHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser && currentUser.token) {
    return {
      'Authorization': `Bearer ${currentUser.token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
}

export const authHeaderSystemet = () => {
  return {'Ocp-Apim-Subscription-Key': config.systemetAccessKey}
}