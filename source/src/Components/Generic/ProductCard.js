import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'


export default ({beer, linkDestination}) =>
{
  return (
    <Card className='card-main'>
      <CardMedia style={{ backgroundSize: 'contain' }}
        className='card-image'
        image={beer.imageUrl ? beer.imageUrl : process.env.PUBLIC_URL + "bottle.png"} />
      <div className='card-details'>
        <CardContent className='card-content'>
          <Typography variant='overline'>{beer.productName}</Typography>
          <Typography variant='body2'>{beer.type}</Typography>
        </CardContent>
        <CardActions className='card-actions'>
          <Button size="small" style={{ color: '#28435C' }}>
            <Link to={linkDestination}>
              Show beer
            </Link>
          </Button>
        </CardActions>
      </div>
    </Card>
  )
}
