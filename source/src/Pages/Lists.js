import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Typography, Box, Button, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useQueryApi, useMyBeersCommandApi } from '../Services/MyBeersService'
import config from '../config'
import NewListModal from '../Components/List/NewListModal';

const Lists = () =>
{
  const [queryState, executeQuery] = useQueryApi(true)
  const { executeCommand } = useMyBeersCommandApi()
  const [lists, setLists] = useState([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  }

  const handleClose = () => {
    setCreateModalOpen(false)
  }

  const handleCreateList = (name, description) => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    executeCommand(`${config.myBeerApiUrl}/list/createList`, {userId: user.id, name, description})
    setTimeout(() => {
      getData()
    }, 100);
  }

  const getData = () => {
    executeQuery(`${config.myBeerApiUrl}/list/ListsFromUser?UserId=${user.id}`)
  }

  useEffect(() =>
  {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  useEffect(() => {
    queryState.data && setLists(queryState.data)
  }, [queryState.data])

  return (
    <div>
      <Box>
        {lists.map(list => (
          <Box margin=".5em" key={list.id}>
            <Card className="listCard">
              <Box padding="1em" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{list.name}</Typography>
                <Link to={`/list/${list.id}`}>
                  <Button variant="outlined">Edit</Button>
                </Link>
              </Box>
            </Card>
          </Box>
        ))}
        <Fab style={fabStyle} color="primary" aria-label="add" onClick={() => setCreateModalOpen(true)}>
          <AddIcon  />
        </Fab>
      </Box>
      <NewListModal 
        handleClose={handleClose} 
        open={createModalOpen}
        handleCreate={handleCreateList} />
     
    </div>
  )
}

export default Lists