import React, { useEffect, useState } from 'react'
import { GetMyBeers, ToggleFavourite } from '../Services/MyBeersService'
import { Typography, Card, CardContent, CardMedia, CardActions, IconButton, Box } from '@material-ui/core';
import FavouriteIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/Delete'
import FavouriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import config from '../config'


const MyBeers = () =>
{
  const [beers, setBeers] = useState();

  useEffect(() =>
  {
    GetMyBeers()
      .then((beersIn) =>
      {
        setBeers(beersIn)
      })
  }, []);

  const buildUrl = (productId) =>
  {
    return `${config.systemetImageBaseUrl}/${productId}/${productId}_300.png`
  }

  const handleFavouriteToggle = (id) => {
    ToggleFavourite(id)
      .then((beer) => setBeers(prevState => ({
      })))
  }

  const handleDelete = (id) => {

  }

  return (
    <div className='card-container'>
      {beers && beers.map(beer => (
        <Box boxShadow="3">
          <Card key={beer.id} className='card-main' >
            <div className='card-details'>
              <CardContent className='card-content'>
                <Typography variant='overline'>{beer.beerData.productName}</Typography>
                <Typography variant='body2'>{beer.beerData.type}</Typography>
              </CardContent>
              <CardActions className='card-actions'>
                <IconButton onClick={handleFavouriteToggle}>
                  {beer.favourite ?
                    <FavouriteIcon className='favourite-icon'/> :
                    <FavouriteBorderIcon />
                  }
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </div>
            <CardMedia
              className='card-image'
              image={buildUrl(beer.beerData.productId)} />
          </Card>
        </Box>


      ))}
    </div>
  )
}


export default MyBeers