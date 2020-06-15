import React, { useState, useEffect } from 'react'
import { useQueryApi } from '../Services/MyBeersService'
import config from '../config'
import ChangePasswordDialog from '../Components/Profile/ChangePasswordDialog'
import { Button, Box, Avatar, Typography } from '@material-ui/core'
import { useMyBeersCommandApi } from '../Services/MyBeersService';
import TextBox from '../Components/Profile/TextBox'
import ImageEdit from '../Components/Profile/ImageEdit'
import { Link } from 'react-router-dom'

const Profile = () =>
{
  const { executeCommand } = useMyBeersCommandApi();
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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getData = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    executeQuery(`${config.myBeerApiUrl}/user/getuser/?id=${userData.id}`)
  }

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

  const handleSave = () => {
    const payload = { username: user.username, email: user.email, id: user.id }
    executeCommand(`${config.myBeerApiUrl}/user/update`, payload)
    setTimeout(() => getData(), 1);
  }
  

  const handleSaveImage = async input => {
    const payload = {id: user.id, imageData: input }
    executeCommand(`${config.myBeerApiUrl}/user/uploadavatar`, payload)
    setTimeout(() => getData(), 1)
  }


  return (
    <>
      {user &&
      <div style={{height: "80vh"}}>
        <Box display="flex" flexDirection="column" justifyContent="space-evenly" height="100%" alignItems="center">
        <h2>Welcome {queryState.data.username}</h2>
        <Link to={`/profile/${user.id}`}><Typography variant="button">See my stats</Typography></Link>
        <Avatar src={user.avatarUrl} style={avatarStyle}/>
        <Button onClick={handleOpenImage}>Edit image</Button>
          <Box display="flex" flexDirection="column" padding=".5em" height="20vh" justifyContent="space-between">
            <TextBox value={user.username} name="username" save={handleSave} state={user} setState={setUser}/>
            <TextBox value={user.email} name="email" save={handleSave} state={user} setState={setUser}/>
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