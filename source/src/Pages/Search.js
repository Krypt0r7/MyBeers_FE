import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Box, Card, CardContent, Typography, CardActions, CardMedia, CircularProgress } from '@material-ui/core'
import { ApiSearch } from '../Services/SystemetService'
import { SearchContext } from '../Components/Context/SearchContext'
import querryString from 'query-string'


const Search = (props) =>
{
  const [searchText, setSearchText] = useState();


  const { searchData, setSearchData } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);

  const handleSearch = async (text) =>
  {
      setLoading(false)
      const response = await ApiSearch(text)
      setSearchData(response);
      setLoading(true)
  }

  const handelKeyDown = (event) => {
    if (event.key === "Enter") {
      props.history.push("/search?query=" + searchText)
      handleSearch(searchText);
    }
  }


  useEffect(() =>
  {
    const param = querryString.parse(props.location.search)
    if (param.query)
    {
      if (!searchData) {
        handleSearch(param.query)
      }
    }
  }, [])

  return (
    <div>
      <div className="search-bar-container">
        {/* <Link to={"/search?query=" + searchText}> */}
          <input
            className="search-bar-input"
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={(event) => handelKeyDown(event)}
            placeholder="Search for beer"
          />
        {/* </Link> */}
      </div>
      {loading ?
      <>
        {searchData && searchData.map(beer => (
          <Box key={beer.productId} boxShadow="3">
            <Card className='card-main' >
                  <CardMedia style={{ backgroundSize: 'contain' }}
                    className='card-image'
                    image={beer.imageUrl ? beer.imageUrl : process.env.PUBLIC_URL + '/bottle.png'} />
                  <div className='card-details'>
                    <CardContent className='card-content'>
                      <Typography variant='overline'>{beer.productName}</Typography>
                      <Typography variant='body2'>{beer.type}</Typography>
                    </CardContent>
                    <CardActions className='card-actions'>
                      <Button size="small" style={{ color: '#28435C' }}>
                        <Link to={`/search/${beer.productNumber}`}>
                          Show beer
                      </Link>
                      </Button>
                    </CardActions>
                  </div>
            </Card>
          </Box>
        ))}
      </>
      :
      <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
        <CircularProgress color="secondary" size="100" />
      </Box>
      }
    </div>
  )
}

export default Search