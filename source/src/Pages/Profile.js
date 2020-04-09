import React, { useState, useEffect } from 'react'
import { useQueryApi } from '../Services/MyBeersService'
import config from '../config'
import ChangePasswordDialog from '../Components/Profile/ChangePasswordDialog'
import { Button, Box, Avatar } from '@material-ui/core'
import { useMyBeersCommandApi } from '../Services/MyBeersService';
import TextBox from '../Components/Profile/TextBox'
import ImageEdit from '../Components/Profile/ImageEdit'

const Profile = () =>
{
  const { myBeersState, executeCommand } = useMyBeersCommandApi();
  const [queryState, executeQuery] = useQueryApi(true)
  const [open, setOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [user, setUser] = useState();


  const avatarStyle = {
    height: "9em",
    width: "9em",
    marginTop: "1em"
  }

  useEffect(() =>
  {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    executeQuery(`${config.myBeerApiUrl}/user/${user.id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    queryState.data && setUser(queryState.data)
  }, [queryState.data])

  const handelOpen = () =>
  {
    setOpen(true)
  }

  const handleClose = () =>
  {
    setOpen(false)
  }

  const handleOpenImage = () =>{
    setImageOpen(true);
  }
  const handleCloseImage = () => {
    setImageOpen(false)
  }

  const handleSave = (input, name) => {
    const payload = {[name]: input}
    executeCommand(`${config.myBeerApiUrl}/user/${user.id}/update`, payload)
  }
  

  const handleSaveImage = async input => {

    let reader = new FileReader();
    reader.readAsDataURL(input);

    reader.onload = (e) => {
      const payload = {
        file: e.target.result
      }
      executeCommand(`${config.myBeerApiUrl}/user/${user.id}/uploadImage`, payload)

    }
  }

  useEffect(() => {
    myBeersState.data && setUser(myBeersState.data)
  }, [myBeersState.data])


  return (
    <>
      {user &&
      <div style={{height: "80vh"}}>
        <Box display="flex" flexDirection="column" justifyContent="space-evenly" height="100%" alignItems="center">
        <h2>Welcome {user.username}</h2>
        <Avatar src={user.avatarUrl} style={avatarStyle}/>
        <Button onClick={handleOpenImage}>Edit image</Button>
          <Box display="flex" flexDirection="column" padding=".5em" height="20vh" justifyContent="space-between">
            <TextBox value={user.username} name="username" save={handleSave} />
            <TextBox value={user.email} name="email" save={handleSave}/>
          </Box>
          <Button onClick={handelOpen} >Change password</Button>
        </Box>
      <ChangePasswordDialog handleClose={handleClose} userId={queryState.data.id} open={open} />
      <ImageEdit open={imageOpen} handleClose={handleCloseImage} saveImage={handleSaveImage} /> 
      </div>

      }
    </>
  )
}

export default Profile