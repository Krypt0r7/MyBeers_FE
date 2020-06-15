import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {buildUrl} from '../../Helpers/BuildImageUrl'


export default ({beer, beerId, linkDestination, remove, rate = false}) =>
{
  const urlBuilder = () => {
    return buildUrl(beer.productId)
  }

  return (
    <Card className='card-main'>
      <CardMedia style={{ backgroundSize: 'contain' }}
        className='card-image'
        image={beer.imageUrl ? beer.imageUrl : urlBuilder()} />
      <div className='card-details'>
        <CardContent className='card-content'>
          <Typography variant='overline'>{beer.name}</Typography>
          <Typography variant='body2'>{beer.type}</Typography>
        </CardContent>
        <CardActions className='card-actions'>
          <Button size="small">
            <Link to={linkDestination}>
              Show beer
            </Link>
          </Button>
          {rate && 
          <>
            <Button size="small" >
              <Link to={`/ratings/${beerId}`}>Rate it</Link>
            </Button>
            <Button onClick={() => remove(beerId)}>Remove</Button>
          </>
          }
        </CardActions>
      </div>
    </Card>
  )
}
