import React from 'react' 
import { List } from '@material-ui/core'
import { Link } from 'react-router-dom'
import TopListItem from './TopListItem'

export default ({data}) => {
  return(
    <div>
      <List className="topList">
          {data && data.map((beer, index) =>
          (
            <Link key={index} to={`/beer/${beer.id}`}>
              <TopListItem image={beer.beerData.imageUrl} index={index} name={beer.beerData.productName} />
            </Link>
          ))
          }
        </List>
    </div>
  )
}