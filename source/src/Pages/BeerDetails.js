import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router"
import { useQueryApi } from '../Services/MyBeersService';
import config from '../config';
import { ErrorContext } from '../Components/Context/ErrorContext';
import { Card, CardMedia, Typography, Box, Button, CircularProgress, CardActions, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
// import Rating from '@material-ui/lab/Rating';
import BasicModal from '../Components/Generic/BasicModal/BasicModal'
import Ribbon from '../Components/Generic/Ribbon';
import VerticalLine from '../Components/Generic/VerticalLine';
import { Link } from 'react-router-dom';

const BeerDetails = () =>
{
  const contentStyle = {
    height: "50vh",
    backgroundSize: "contain",
    marginBottom: "1em"
  }

  const sectionStyle = {
    marginBottom: ".5em"
  }

  const [queryState, executeQuery] = useQueryApi()
  const [listsState, executeListQuery] = useQueryApi()
  const [beer, setBeer] = useState()
  const [addToListModal, setAddToListModal] = useState(false)
  const [lists, setLists] = useState(null)
  const { setError } = useContext(ErrorContext)
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const { id } = useParams();

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/beer/withLists?id=${id}&userId=${user.id}`)
    executeListQuery(`${config.myBeerApiUrl}/list/ListsFromUser?UserId=${user.id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() =>
  {
    setBeer(queryState.data)
    queryState.error && setError(queryState.error.response)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryState])

  useEffect(() =>
  {
    listsState.data && setLists(listsState.data)
  }, [listsState])

  const priceFormatter = (price) =>
  {

    if (price.toString().includes('.'))
    {
      return String(price).split('.').join(':') + '0 kr'
    }
    return price + " kr";
  }


  return (
    <>
      {beer ?
        <Card className="details-card" style={{ position: "relative" }}>
          <CardMedia image={beer.imageUrl ? beer.imageUrl : ''} style={contentStyle}>
            <Box width="100%" height="100%">
              <Ribbon text={"YPK: " + beer.ypk} />
            </Box>
          </CardMedia>
          <Typography style={sectionStyle} variant="overline" >{beer.style}</Typography>
          <Typography variant="h5">{beer.name}</Typography>
          <Typography style={sectionStyle} variant="caption">Brewed in {beer.country}, {beer.state}, {beer.city}</Typography>
          <Box margin=".5em 0" display="flex" flexDirection="row" justifyContent="space-evenly">
            <Typography variant="h5">{priceFormatter(beer.price)}</Typography>
            <VerticalLine />
            <Typography variant="h5">{beer.volume} ml</Typography>
            <VerticalLine />
            <Typography variant="h5">{beer.alcoholPercentage} %</Typography>
          </Box>
          <Typography style={sectionStyle} variant="body1">{beer.taste}</Typography>
          <CardActions>
            <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
              <Button variant="outlined">
                <Link to={`/ratings/${beer.id}`} >See ratings</Link>
              </Button>
              <Button onClick={() => setAddToListModal(true)} variant="outlined" color="primary">Add to list</Button>
            </Box>
          </CardActions>
        </Card>
        :
        <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
          <CircularProgress color="secondary" size="100" />
        </Box>
      }
      <BasicModal
        open={addToListModal}
        fullScreen={false}
        fullWidth
        handleClose={() => setAddToListModal(false)}>
        <div>
          <List>
            {['MyLists', 'Collaborating on'].map((name, index) => (
              <li>
                <ul>
                  <ListSubheader>{name}</ListSubheader>
                  {lists && (
                    index === 1 ? lists.myLists.map(list => (
                     <ListItem>
                       <ListItemText>{list.name}</ListItemText>
                     </ListItem>
                   ))
                   :
                   lists.collaborateLists.map(list => (
                     <ListItem>
                       <ListItemText>{list.name}</ListItemText>
                     </ListItem>
                   ))
                  )
                  }
                </ul>
              </li>
            ))}
          </List>
        </div>
      </BasicModal>

    </>
  )
}

export default BeerDetails