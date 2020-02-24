import React, { useEffect, useState } from 'react'
import { useQueryApi } from '../Services/MyBeersService'
import config from '../config'
import { Box, Card, Avatar, Typography, CardMedia } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating'
import moment from 'moment'
import { Link } from 'react-router-dom';

const Index = () =>
{
  const imgStyle = {
    width: "100%",
    height: "100%",
    backgroundSize: "contain"
  }
  const linkStyle = {
    width: "20%",
    height: "100%"
  }

  const [queryState, setQueryState] = useQueryApi(true);
  const [ratings, setRatings] = useState(null);

  useEffect(() =>
  {
    setQueryState(`${config.myBeerApiUrl}/rating`)
  }, [])

  useEffect(() =>
  {
    queryState.data && setRatings(queryState.data)
  }, [queryState.data])

  const formatDate = (date) =>
  {
    return (
      moment(date).format('DD-MM-YYYY hh:mm')
    )
  }


  return (
    <div>
      {ratings && ratings.map(rating => (
        <Card key={rating.createdTime} style={{ margin: "10px" }}>
          <Box display="flex" margin="10px" a alignItems="center" justifyContent="space-between">
            <Box display="flex">
              <Avatar src="" style={{ marginRight: "15px" }} />
              <Typography variant="h6">{rating.user.username}</Typography>
            </Box>
            <Box>
              <Typography variant="caption">rated {formatDate(rating.createdTime)}</Typography>
            </Box>
          </Box>
          <Box margin="10px" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" height="60px">
            <Box display="flex" flexDirection="column"  >
              <Rating value={rating.overallRating} name={rating.createdTime}/>
              <Typography>{rating.beer.beerData.productName}</Typography>
            </Box>
            <Link style={linkStyle} to={`/search/${rating.beer.beerData.productNumber}`}>
              <CardMedia style={imgStyle} image={rating.beer.beerData.imageUrl} />
            </Link>
          </Box>
        </Card>
      ))}
    </div>
  )
}


export default Index