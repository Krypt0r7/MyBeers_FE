import React, { useState, useEffect } from 'react'
import { useQueryApi } from '../Services/MyBeersService'
import config from '../config'
import ChangePasswordDialog from '../Components/Profile/ChangePasswordDialog'
import { Button, Box, Avatar, Typography } from '@material-ui/core'
import { useMyBeersCommandApi } from '../Services/MyBeersService';
import TextBox from '../Components/Profile/TextBox'
import ImageEdit from '../Components/Profile/ImageEdit'
import { Link } from 'react-router-dom'
import Axios from 'axios'

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

    let bodyFormData = new FormData();
    bodyFormData.append('image', input)

    Axios({
      method: 'POST',
      url: `http://localhost:51210/user/${user.id}/uploadImage`,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'}
    }).then((resp) => {
      console.log(resp);
    }).then((resp) => {
      console.log(resp);
    })
   
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
        <Link to={`/profile/${user.username}`}><Typography variant="button">See my stats</Typography></Link>
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