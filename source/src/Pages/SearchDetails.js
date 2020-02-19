import React,  { useEffect, useState, useContext } from 'react'
import {useParams} from 'react-router'
import { SearchContext } from '../Components/Context/SearchContext';
import { GetSingleBeer } from '../Services/SystemetService';
import { Card, Typography, CardMedia, Box, CardActions, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
import { SaveBeer } from '../Services/MyBeersService';
import CustomSnackBar from '../Components/Generic/CustomSnackBar'

const SearchDetails = () => {

  const contentStyle = {
    height: "55vh",
    backgroundSize: "contain",
    marginBottom: "1em"
  }

  const circularStyle = {
    color: "#3F88C5"
  }
  const sectionStyle = {
    marginBottom: ".5em"
  }

  const {id} = useParams();
  const [selectedBeer, setSelectedBeer] = useState();
  const [open, setOpen] = useState(false);
  const {searchData} = useContext(SearchContext);

  const searchResult = searchData && searchData.find(beer => beer.productNumber == id)

  const getSelectedBeerFromApi = async () =>  { setSelectedBeer(await GetSingleBeer(id)) }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  }
  const handleOpen = () => setOpen(true);

  const handleAddBeer = async (productNumber) =>
  {
    await SaveBeer(productNumber);
    handleOpen();
  }

  useEffect(() => {
   searchResult ? setSelectedBeer(searchResult) : getSelectedBeerFromApi()
  }, [])
  
  return (
    <>
    <Card className="details-card">
        {selectedBeer ?
          <>
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
          </>
          :
          <CircularProgress style={circularStyle}  />
        }


    
    </Card>
    <CustomSnackBar 
      open={open}
      onClose={handleClose}
      prod={selectedBeer && selectedBeer.productName}
      action=' was added'/>
    </>
  )
}

const VerticalLine = () => {
  const lineStyle = {
    borderLeft: "1px solid",
    borderLeftColor: "rgba(0, 0, 0, 0.12)"
  }
  return (
    <div style={lineStyle}></div>
  )
}

export default SearchDetails