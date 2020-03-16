import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {buildUrl} from '../../Helpers/BuildImageUrl'
import Skeleton from '@material-ui/lab/Skeleton'


export default ({beer, linkDestination}) =>
{

  const urlBuilder = () => {
    return buildUrl(beer.productId)
  }

  return (
    <Card className='card-main'>
      {urlBuilder ? (
      <CardMedia style={{ backgroundSize: 'contain' }}
        className='card-image'
        image={beer.imageUrl ? beer.imageUrl : urlBuilder()} />
      ):(
        <Skeleton className="card-image" variant="rect" width={150} height={150}/>
      )}
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
