import React, { useEffect, useState } from 'react'
import { GetMyBeers, RemoveBeer } from '../Services/MyBeersService'
import { Typography, Card, CardContent, CardMedia, CardActions, IconButton, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import Rating from '@material-ui/lab/Rating'
import { buildUrl } from '../Helpers/BuildImageUrl'


const MyBeers = () =>
{
  const [beers, setBeers] = useState();
  const [rating, setRating] = useState();

  useEffect(() =>
  {
    GetMyBeers()
      .then((beersIn) =>
      {
        setBeers(beersIn)
      })
  }, []);


  const handleRatingChange = async (id, index) =>
  {
    // const newBeer = await ChangeRating(id);
    // const newBeers = [...beers]
    // newBeers[index] = newBeer;
    // setBeers(newBeers)
  }

  const handleDelete = async (id) =>
  {
    await RemoveBeer(id);
    const newBeers = beers.filter(beer => beer.id !== id);
    setBeers(newBeers)
  }

  return (
    <div className='card-container'>
      {beers && beers.map((beer, index) => (
        <Box key={beer.id} boxShadow="3">
          <Card className='card-main' >
            <div className='card-details'>
              <CardContent className='card-content'>
                <Typography variant='overline'>{beer.beerData.productName}</Typography>
                <Typography variant='body2'>{beer.beerData.type}</Typography>
              </CardContent>
              <CardActions className='card-actions'>
                <IconButton onClick={() => handleRatingChange(beer.id, index)}>
                  <Rating name="beerRating"/>
                </IconButton>
                <IconButton onClick={() => handleDelete(beer.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </div>
            <CardMedia style={{ backgroundSize: 'contain' }}
              className='card-image'
              image={buildUrl(beer.beerData.productId)} />
          </Card>
        </Box>


      ))}
    </div>
  )
}


export default MyBeers