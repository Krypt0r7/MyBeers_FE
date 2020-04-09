import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router"
import { useQueryApi } from '../Services/MyBeersService';
import config from '../config';
import { ErrorContext } from '../Components/Context/ErrorContext';
import { Card, CardMedia, Typography, Box, CardActions, Button, CircularProgress } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Ribbon from '../Components/Generic/Ribbon';
import VerticalLine from '../Components/Generic/VerticalLine';
import { Link } from 'react-router-dom';


export default () => {

  
  const contentStyle = {
    height: "55vh",
    backgroundSize: "contain",
    marginBottom: "1em"
  }
  
  const sectionStyle = {
    marginBottom: ".5em"
  }
  
  const [queryState, executeQuery] = useQueryApi()
  const [beer, setBeer] = useState();
  const {setError} = useContext(ErrorContext)
  
  const {id} = useParams();
  
  useEffect(() => {
    executeQuery(`${config.myBeerApiUrl}/beer/${id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(() => {
    setBeer(queryState.data)
    queryState.error &&  setError(queryState.error.response)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryState])

  
  return (
    <>
      {beer ?
        <Card className="details-card" style={{position: "relative"}}>
            <CardMedia image={beer.beerData.imageUrl} style={contentStyle}>
              <Box width="100%" height="100%">
                <Ribbon text={"YPK: " + beer.ypk} />
              </Box>
            </CardMedia>
            <Typography style={sectionStyle} variant="overline" >{beer.beerData.beverageDescriptionShort}</Typography>
            <Typography variant="h5">{beer.beerData.productName}</Typography>
            <Typography style={sectionStyle} variant="caption">Tillverkad i {beer.beerData.country}, {beer.beerData.originLevel1}, {beer.beerData.originLevel2}</Typography>
            <Box margin=".5em 0" display="flex" flexDirection="row" justifyContent="space-evenly">
              <Typography variant="h5">{String(beer.beerData.price).split('.').join(':') + '0 kr'}</Typography>
              <VerticalLine />
              <Typography variant="h5">{beer.beerData.volume} ml</Typography>
              <VerticalLine />
              <Typography variant="h5">{beer.beerData.alcoholPercentage} %</Typography>
            </Box>
            <Typography style={sectionStyle} variant="body1">{beer.beerData.taste}</Typography>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" padding="0 0 5px 0">
              <Box display="flex" flexDirection="column">
                {beer.rating && (
                <>
                  <Typography variant="body1">My rating:</Typography>
                  <Rating name="overallRating" value={beer.rating ? beer.rating.overallRating : 0} />
                </>
                )
                }
              </Box>
            </Box>
            <CardActions style={{padding: 0}}>
              <Box justifyContent="space-between" display="flex" width="100%">
                <Button variant="outlined">
                  <Link to={`/ratings/${beer.id}`} >
                    See/add ratings
                  </Link>
                </Button>
              </Box>
            </CardActions>
        </Card>
        :
        <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
          <CircularProgress color="secondary" size="100" />
        </Box>
      }

    </>
  )
}