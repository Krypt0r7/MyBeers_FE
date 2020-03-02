import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQueryApi, useUpdateApi } from '../Services/MyBeersService';
import { Card, CardMedia, Box, Typography, Button, Divider } from '@material-ui/core'
import config from '../config';
import RatingSummary from '../Components/Ratings/RatingSummary';
import RatingUserRating from '../Components/Ratings/RatingUserRating';
import RatingEditRating from '../Components/Ratings/RatingEditRating';


export default () =>
{
  const [beer, setBeer] = useState()
  const [myRating, setMyRating] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [queryState, executeQuery] = useQueryApi()
  const { updateState, executeUpdate } = useUpdateApi()
  const { id } = useParams();

  const imageStyle = {
    backgroundSize: "contain",
    height: "10vh",
    width: "20%",
    marginRight: ".5em"
  }

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/beer/${id}/ratings`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() =>
  {
    setBeer(queryState.data)
  }, [queryState.data])

  useEffect(() => {
    if (updateState.data) {
      setBeer({...beer, ratings: [...beer.ratings.filter(rating => rating.id !== myRating.id), updateState.data].sort((a, b) => {return new Date(a.createdTime) - new Date(b.createdTime)})})
    }

  }, [updateState.data])

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleSave = (rating, description) => {

    if (myRating) {
      executeUpdate(`${config.myBeerApiUrl}/rating/${myRating.id}`, {rating: parseInt(rating), description})
    } else {
      executeUpdate(`${config.myBeerApiUrl}/rating`, {rating: parseInt(rating), description, beerId: id})
    }
    setDialogOpen(false)
  }

  const handleOpen = () => {
    setDialogOpen(true);
  }

  useEffect(() =>
  {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    const theRating = beer && beer.ratings.find(x => x.user.id === user.id);
    theRating && setMyRating(theRating);
  }, [beer])

  return (
    <div className="card-container">
      {beer &&
        <Card style={{ padding: ".5em" }}>
          <Box minHeight="10vh" width="100%" display="flex" marginBottom=".5em" justifyContent="space-between" >
            <Typography variant="overline">{beer.beerData.productName}</Typography>
            <CardMedia
              style={imageStyle}
              image={beer.beerData.imageUrl} />
          </Box>
          {beer.ratings.length !== 0 && (
          (myRating) ?
            <RatingUserRating
              open={handleOpen}
              beerId={beer.id}
              created={myRating.createdTime}
              rating={myRating.overallRating}
              username={myRating.user && myRating.user.username}
              isOwner={true}/>
            :
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography>You have not rated this beer!</Typography>
              <Button variant="outlined" onClick={handleOpen}>Rate now</Button>
            </Box>
          )}
          <Box>
            {beer.ratings.length !== 0 ?
              <>
                <Divider style={{ margin: "1em" }} />
                <RatingSummary ratings={beer.ratings} />
                <Divider style={{ margin: "1em" }} />
                {beer.ratings.map(rating => (
                  <Box
                    key={rating.id}
                    margin="1em 0">
                    <RatingUserRating
                      username={rating.user && rating.user.username}
                      created={rating.createdTime}
                      rating={rating.overallRating} />
                    {rating.description &&
                      <Typography style={{margin: ".5em 0"}}>"{rating.description}"</Typography>
                    }
                  </Box>
                ))}
              </>
              :
              <Box display="flex" alignItems="center" flexDirection="column">
                <Typography>No ratings yet</Typography>
                <Button variant="outlined" onClick={handleOpen}>Be the first to rate</Button>
              </Box>
            }
          </Box>
        </Card>
      }
      <RatingEditRating
        handleClose={handleClose}
        handleSave={(rating, description) => handleSave(rating, description)}
        open={dialogOpen}
        rating={myRating && myRating}
        setMyRating={setMyRating} />
    </div>
  )
}