import AuthenticationService from '../Services/AuthenticationService'

export const HandleResponse = (response) =>
{
  return response.text().then(text =>
  {
    const data = text && JSON.parse(text);
    if (!response.ok)
    {
      if ([401, 403, 400].indexOf(response.status) !== -1)
      {
        AuthenticationService.Logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
