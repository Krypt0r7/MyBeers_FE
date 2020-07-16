import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useQueryApi, useMyBeersCommandApi } from '../Services/MyBeersService';
import AddBeerModal from '../Components/List/AddBeerModal'
import config from '../config';
import { Card, Box, Button, CardActions, CardHeader, IconButton, List, Avatar, ListItemText, ListItemAvatar, ListItem, ListItemSecondaryAction, Menu, MenuItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Chip } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import EditListModal from '../Components/List/EditList';
import RemoveListModal from '../Components/List/RemoveListModal';

const ListDetails = () =>
{
  const { id } = useParams()
  const [ancorEl, setAncorEl] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const menuOpen = Boolean(ancorEl)
  const { executeCommand } = useMyBeersCommandApi()
  const [querryState, executeQuery] = useQueryApi()
  const [list, setList] = useState(null)
  const [addBeerModal, setAddBeerModal] = useState(false);
  const [removeListModal, setRemoveListModal] = useState(false)
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [isOwner, setIsOwner] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);

  const expansionStyle = {
    width: '100%',
    padding: '0'
  }

  const chipStyle = {
    margin: "0 .2em"
  }

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/list/listfromid?id=${id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() =>
  {
    setList(querryState.data)
    if (querryState.data)
    {
      setIsOwner(querryState.data.owner.id === user.id)
      setIsCollaborator(querryState.data.collaborators.some(x => x.id === user.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querryState.data])

  const handleSave = (ids) =>
  {
    executeCommand(`${config.myBeerApiUrl}/list/updatebeers`, { listId: list.id, beerIds: ids })
  }

  const handleMenuClick = (event) =>
  {
    setAncorEl(event.currentTarget)
  }

  const handleClose = () =>
  {
    setAncorEl(null)
  }
  const handleOpenAddBeerModal = () =>
  {
    setAncorEl(null)
    setAddBeerModal(true)
  }

  const removeFromList = (id) =>
  {
    const beers = list.beers.filter(x => x.id !== id);
    setList({ ...list, beers: beers })

    const beerIds = beers.map(x =>
    {
      return x.id
    })
    handleSave(beerIds)
  }

  const handleDeleteList = () =>
  {
    executeCommand(`${config.myBeerApiUrl}/list/deleteList`, { Id: list.id })
    setTimeout(() =>
    {
      history.push('/lists')
    }, 100);
  }

  const handleToList = (list) =>
  {
    setList(list);
    const beerIds = list.beers.map(x => { return x.id })
    handleSave(beerIds)
    setAddBeerModal(false)
  }

  const handleSaveEdit = (name, description, collabList) =>
  {
    const collabIds = collabList.map(x => { return x.id })
    executeCommand(`${config.myBeerApiUrl}/list/updateListInfo`, { id: list.id, name, description, collaboratorids: collabIds })
    setList({ ...list, name, description, collaborators: collabList })
    setAncorEl(null)
    setEditOpen(false)
  }

  return (
    <div>
      {list &&
        <Card style={{ margin: ".5em" }}>
          <CardHeader
            action={(isCollaborator || isOwner) &&
              <IconButton aria-controls="optionMenu" aria-haspopup="true" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title={list.name}
            subheader={list.description}
          />

          <Menu
            id="optionMenu"
            keepMounted
            anchorEl={ancorEl}
            open={menuOpen}
            onClose={handleClose}>
            <MenuItem onClick={handleOpenAddBeerModal}>Add beer</MenuItem>
            {isOwner &&
              <div>
                <MenuItem onClick={() => setEditOpen(true)}>Edit list info</MenuItem>
                <MenuItem onClick={() => setRemoveListModal(true)}>Delete list</MenuItem>
              </div>
            }

          </Menu>

          {list.collaborators.length !== 0 &&
            <Box display="flex" margin="0 1em" alignItems="center" flexWrap="wrap">
              <Typography>Collaborators: </Typography>
              {list && list.collaborators.map(user => (
                <Chip style={chipStyle} key={user.id} color="primary" variant="outlined" label={user.username} />
              ))}
            </Box>
          }

          <Box padding=".5em">
            <List>
              {list.beers && list.beers.map(beer => (
                <ExpansionPanel key={beer.id}>
                  <ExpansionPanelSummary style={expansionStyle}>
                    <ListItem >
                      <ListItemAvatar>
                        <Avatar src={beer.imageUrl} />
                      </ListItemAvatar>
                      <ListItemText primary={beer.name} secondary={beer.producer} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => removeFromList(beer.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Box display='flex' justifyContent="space-between" width="100%" alignItems="flex-end">
                      <Box display="flex" flexDirection="column">
                        <Typography>{beer.alcohol} %</Typography>
                        <Typography>{beer.price} kr</Typography>
                        <Typography>{beer.country}</Typography>
                        <Typography>{beer.state}</Typography>
                        <Typography>{beer.city}</Typography>
                      </Box>
                      <Link to={`/beer/${beer.id}`}>
                        <Button variant="outlined">Read more</Button>
                      </Link>
                    </Box>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))
              }
            </List>
          </Box>
          <CardActions>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Link to="/lists">
                <Button color="default" variant="outlined">Go back</Button>
              </Link>
            </Box>
          </CardActions>
        </Card>
      }
      <AddBeerModal
        open={addBeerModal}
        handleClose={() => setAddBeerModal(false)}
        handleUpdate={handleToList}
        listItems={list} />
      {
        list &&
        <>
          <EditListModal
            list={list}
            handleClose={() => setEditOpen(false)}
            handleSave={handleSaveEdit}
            open={editOpen} />
          <RemoveListModal
            open={removeListModal}
            remove={handleDeleteList}
            handleClose={() => setRemoveListModal(false)}
            list={list} />
        </>
      }
    </div >
  )
}

export default ListDetails