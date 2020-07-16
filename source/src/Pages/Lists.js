import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {  Box,  Fab, Paper, Tabs, Tab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useQueryApi, useMyBeersCommandApi } from '../Services/MyBeersService'
import config from '../config'
import NewListModal from '../Components/List/NewListModal';
import ListOfLists from '../Components/List/ListOfLists';

const TabPanel = (props) =>
{
  const { children, value, index, ...other } = props
  return (
    <div
      hidden={value !== index}
      {...other}>
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  )
}


const Lists = () =>
{
  const [queryState, executeQuery] = useQueryApi(true)
  const { executeCommand } = useMyBeersCommandApi()
  const [lists, setLists] = useState([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  }

  const handleClose = () =>
  {
    setCreateModalOpen(false)
  }

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue)
  }

  const handleChangeIndex = (index) => {
    setTabIndex(index)
  }

  const handleCreateList = (name, description) =>
  {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    executeCommand(`${config.myBeerApiUrl}/list/createList`, { userId: user.id, name, description })
    setTimeout(() =>
    {
      getData()
    }, 150);
  }

  const getData = () =>
  {
    executeQuery(`${config.myBeerApiUrl}/list/ListsFromUser?UserId=${user.id}`)
  }

  useEffect(() =>
  {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  useEffect(() =>
  {
    queryState.data && setLists(queryState.data)
  }, [queryState.data])

  return (
    <div>
      <Paper>
        <Tabs
          value={tabIndex}
          centered
          indicatorColor="primary"
          onChange={handleChangeTab}>
          <Tab label="My lists" />
          <Tab label="Collaborates on" />
        </Tabs>
      </Paper>
      <Box>
        <SwipeableViews 
          // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabIndex}
          onChangeIndex={handleChangeIndex}>
          <TabPanel value={tabIndex} index={0}>
            <ListOfLists lists={lists.myLists} /> 
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
             <ListOfLists lists={lists.collaborateLists} />
          </TabPanel>
        </SwipeableViews>
        <Fab style={fabStyle} color="primary" aria-label="add" onClick={() => setCreateModalOpen(true)}>
          <AddIcon />
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