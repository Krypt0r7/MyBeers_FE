import React,  { useEffect, useState, useContext } from 'react'
import {useParams} from 'react-router'
import { SearchContext } from '../Components/Context/SearchContext';
import { useApiSearch } from '../Services/SystemetService';
import { Card, Typography, CardMedia, Box, CardActions, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
import { useUpdateApi } from '../Services/MyBeersService';
import CustomSnackBar from '../Components/Generic/CustomSnackBar'
import config from '../config'
import VerticalLine from '../Components/Generic/VerticalLine';

const SearchDetails = () => {

  const contentStyle = {
    height: "55vh",
    backgroundSize: "contain",
    marginBottom: "1em"
  }

  const sectionStyle = {
    marginBottom: ".5em"
  }

  const {id} = useParams();
  const [selectedBeer, setSelectedBeer] = useState();
  const [open, setOpen] = useState(false);
  const {searchData} = useContext(SearchContext);

  const [state, executeSearch] = useApiSearch(true)
  const {executeUpdate} = useUpdateApi(true)

  const searchResult = searchData && searchData.find(beer => parseInt(beer.productNumber) === id)

  const getSelectedBeerFromApi = () =>  {
    executeSearch(`${config.myBeerApiUrl}/systemet/${id}`)
  }
  
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  }
  
  const handleAddBeer = (productNumber) =>
  {
    executeUpdate(`${config.myBeerApiUrl}/user/add-beer?productNumber=${productNumber}`);
    setOpen(true);
  }
  
  useEffect(() => {
    searchResult ? setSelectedBeer(searchResult) : getSelectedBeerFromApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult])
  
  useEffect(() => {
    state.data && setSelectedBeer(state.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data])
  
  return (
    <>
      {selectedBeer ?
        <Card className="details-card">
            <CardMedia image={selectedBeer.imageUrl} style={contentStyle}/>
            <Typography style={sectionStyle} variant="overline" >{selectedBeer.beverageDescriptionShort}</Typography>
            <Typography variant="h5">{selectedBeer.productName}</Typography>
            <Typography style={sectionStyle} variant="caption">Tillverkad i {selectedBeer.country}, {selectedBeer.originLevel1}, {selectedBeer.originLevel2}</Typography>
            <Box margin=".5em 0" display="flex" flexDirection="row" justifyContent="space-evenly">
              <Typography variant="h5">{String(selectedBeer.price).split('.').join(':') + '0 kr'}</Typography>
              <VerticalLine />
              <Typography variant="h5">{selectedBeer.volume} ml</Typography>
              <VerticalLine />
              <Typography variant="h5">{selectedBeer.alcoholPercentage} %</Typography>
            </Box>
            <Typography style={sectionStyle} variant="body1">{selectedBeer.taste}</Typography>
            <CardActions >
              <Box justifyContent="flex-end" display="flex" width="100%">
                <Button onClick={() => handleAddBeer(selectedBeer.productNumber)} size="medium" variant="outlined">Add beer</Button>
              </Box>
            </CardActions>
        </Card>
        :
        <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
          <CircularProgress color="secondary" size="100" />
        </Box>
      }    
    <CustomSnackBar 
      open={open}
      close={handleClose}
      prod={selectedBeer && selectedBeer.productName}
      action=' was added'/>
    </>
  )
}

export default SearchDetails