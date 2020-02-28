import React, { useState, useContext, useEffect } from 'react'
import { Card, Box, Avatar, Typography, CardMedia } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useQueryApi } from '../Services/MyBeersService';
import { ErrorContext } from '../Components/Context/ErrorContext';
import config from '../config';

export default () => {

  const imgStyle = {
    width: "100%",
    height: "100%",
    backgroundSize: "contain"
  }
  const linkStyle = {
    width: "20%",
    height: "100%"
  }

  const [queryState, executeQuery] = useQueryApi(true);
  const [ratings, setRatings] = useState(null);
  const {setError} = useContext(ErrorContext);

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/rating`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() =>
  {
    queryState.data && setRatings(queryState.data)
    queryState.error && setError(queryState.error.message)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Box display="flex" margin="10px" alignItems="center" justifyContent="space-between">
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
            <Link style={linkStyle} to={`/ratings/${rating.beer.id}`}>
              <CardMedia style={imgStyle} image={rating.beer.beerData.imageUrl} />
            </Link>
          </Box>
        </Card>
      ))}
    </div>
  )
}
