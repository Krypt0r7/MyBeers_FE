import React, { useState, useContext, useEffect } from 'react'
import {Link } from 'react-router-dom'
import { Button, Box, Card, CardContent, Typography, CardActions, CardMedia, CircularProgress } from '@material-ui/core'
import { ApiSearch } from '../Services/SystemetService'
import { SearchContext } from '../Components/Context/SearchContext'
import querryString from 'query-string'
// import { SaveBeer } from '../Services/MyBeersService'
// import CustomSnackBar from '../Components/Generic/CustomSnackBar'
// import MyBeers from './MyBeers';


const Search = (props) =>
{
  const [searchText, setSearchText] = useState();
  
  
  const {searchData, setSearchData} = useContext(SearchContext);
  
  // const [snack, setSnack] = useState({
    //   open: false,
    //   message: ''
    // });
    
  const handleSearch = async (text) =>
  {
    // const param = querryString.parse(props.location.search)
    const response = await ApiSearch(text)
    setSearchData(response);
  }
  
  
  useEffect(() => {
    const param = querryString.parse(props.location.search)
    if (param.query){
    // setSearchText(param.query)
      handleSearch(param.query)
    }  
  }, [])


  // const handleClose = (open) => {
  //   setSnack({ ...snack, open})
  // }

  // const handleAddBeer = async (productNumber) =>
  // {
  //   const beer = await SaveBeer(productNumber);
  //   setSnack({...snack, open: true, message: beer.beerData.productName });
  // }

  return (
    <div>
      <div className="search-bar-container">
        <input
          className="search-bar-input"
          onChange={(event) => setSearchText(event.target.value)}
          />
        <Button variant="text" >
          <Link to={"/search?query=" + searchText} onClick={() => handleSearch(searchText)}>Search</Link>
        </Button>
      </div>
      {searchData && searchData.map(beer => (
        <Box key={beer.productId} boxShadow="3">
          <Card className='card-main' >
            {searchData ?
            <>
              <CardMedia style={{ backgroundSize: 'contain' }}
                className='card-image'
                image={beer.imageUrl ? beer.imageUrl : process.env.PUBLIC_URL + '/bottle.png'} />
              <div className='card-details'>
                <CardContent className='card-content'>
                  <Typography variant='overline'>{beer.productName}</Typography>
                  <Typography variant='body2'>{beer.type}</Typography>
                </CardContent>
                <CardActions className='card-actions'>
                  <Button size="small" style={{color: '#28435C'}}>
                    <Link to={`/search/${beer.productNumber}`}>
                      Show beer
                    </Link>
                  </Button>
                </CardActions>
              </div>
            </>
            :
            <CircularProgress />
            }
          </Card>
        </Box>

      ))}

    </div>
  )
}

export default Search