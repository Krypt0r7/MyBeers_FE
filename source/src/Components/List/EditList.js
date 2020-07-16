import React, { useState, useEffect } from 'react'
import { Box, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Avatar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Remove'
import { useQueryApi } from '../../Services/MyBeersService';
import BasicModal from '../Generic/BasicModal/BasicModal';
import config from '../../config';


const EditList = ({ list, handleClose, open, handleSave }) =>
{

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [collaborators, setCollaborators] = useState([])
  const [users, setUsers] = useState([])
  const [querryState, executeQuery] = useQueryApi()
  const [userSearch, setUserSearch] = useState("")
  const [addCollabModal, setAddCollabModal] = useState(false)

  useEffect(() =>
  {
    setName(list.name)
    setDescription(list.description)
    setCollaborators(list.collaborators)
  }, [list])

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/user/usernames`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() =>
  {
    const myName = JSON.parse(localStorage.getItem('currentUser'))
    const userFilter = querryState.data && querryState.data.filter(user => user.username.toLowerCase().includes(userSearch.toLowerCase()) && user.username !== myName.username)
    if (userSearch !== "")
    {
      setUsers(userFilter)
    } else
    {
      setUsers([])
    }

  }, [userSearch, querryState.data])

  const handleSaveChanges = () =>
  {
    handleSave(name, description, collaborators)
    setName("")
    setDescription("")
    handleClose()
  }

  const handleUpdateCollaborator = (id) =>
  {
    if (collaborators.some(collab => collab.id === id))
    {
      const newCollab = collaborators.filter(collab => collab.id !== id)
      setCollaborators(newCollab)
    } else
    {
      setCollaborators([...collaborators, users.find(f => f.id === id)])
    }

  }

  const inputStyle = {
    padding: ".5em 0"
  }

  const columns = [
    {
      id: "name",
      name: "name"
    }
  ]

  const cellStyle = {
    padding: "6px 2px 6px 10px"
  }

  return (
    <>
      <BasicModal
        fullscreen={true}
        fullWidth={false}
        handleClose={handleClose}
        open={open}
        backAction={handleSaveChanges}>
        <Typography variant="h5">Name and description</Typography>
        <Box margin=".5em">
          <TextField
            style={inputStyle}
            value={name}
            fullWidth
            placeholder="Name"
            onChange={(event) => setName(event.target.value)} />
          <TextField
            style={inputStyle}
            value={description}
            multiline
            rowsMax={3}
            fullWidth
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)} />
        </Box>
        <Box>
          <Typography variant="h5">List of collaborators</Typography>
          <Box margin=".5em" display="flex" justifyContent="flex-end" width="100%">
            <Button onClick={() => setAddCollabModal(true)} variant="outlined">Add collaborator</Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell style={cellStyle} size="small" key={column.id}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {collaborators && collaborators.map(user =>
                  (
                    <TableRow key={user.id}>
                      <TableCell style={cellStyle} size="small">
                        {user.username}
                      </TableCell>
                      <TableCell style={cellStyle}>
                        <RemoveIcon onClick={() => handleUpdateCollaborator(user.id)} />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </BasicModal>
      <BasicModal
        fullWidth
        open={addCollabModal}
        backAction={() => setAddCollabModal(false)}
        handleClose={() => setAddCollabModal(false)}>
        <Box>
          <TextField placeholder="Search for user" onChange={(event) => setUserSearch(event.target.value)} />
          <List>
            {users && users.map(user =>
              <ListItem key={user.id}>
                <Box display="flex" alignItems="center">
                  <ListItemAvatar>
                    <Avatar src={user.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={user.username} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleUpdateCollaborator(user.id)}>
                      {collaborators.some(x => x.id === user.id) ?
                        <CheckIcon />
                        :
                        <AddIcon />
                      }
                    </IconButton>
                  </ListItemSecondaryAction>
                </Box>
              </ListItem>
            )}
          </List>
        </Box>
      </BasicModal>
    </>
  )
}

export default EditList