import React, { useState, useContext, useEffect } from 'react'
import { Card, Box, Avatar, Typography, CardMedia } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useQueryApi } from '../Services/MyBeersService';
import { ErrorContext } from '../Components/Context/ErrorContext';
import config from '../config';

export default () => {
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
          <Link style={linkStyle} to={`/ratings/${rating.beer.id}`}>
            <Box display="flex" justifyContent="space-between" margin="10px" >
              <Box display="flex"  alignItems="center">
                  <Avatar src={rating.user.avatarUrl} style={{ marginRight: "15px" }} />
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">{rating.user.username}</Typography>
                  <Typography>{rating.beer.beerData.productName}</Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography className="ratingListDate" variant="caption">{formatDate(rating.createdTime)}</Typography>
                <Rating value={rating.overallRating} precision={.1} size="small" name={rating.createdTime}/>
              </Box>  
            </Box>
          </Link>
        </Card>
      ))}
    </div>
  )
}
