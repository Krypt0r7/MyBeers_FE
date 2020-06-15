import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { SearchContext } from '../Components/Context/SearchContext';
import { useQueryApi } from '../Services/MyBeersService';
import { Card, Typography, CardMedia, Box, CardActions, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMyBeersCommandApi } from '../Services/MyBeersService';
import CustomSnackBar from '../Components/Generic/CustomSnackBar'
import config from '../config'
import VerticalLine from '../Components/Generic/VerticalLine';

const SearchDetails = (props) =>
{
  const contentStyle = {
    height: "55vh",
    backgroundSize: "contain",
    marginBottom: "1em"
  }

  const sectionStyle = {
    marginBottom: ".5em"
  }

  const { id } = useParams();
  const [selectedBeer, setSelectedBeer] = useState();
  const [open, setOpen] = useState(false);

  const [ queryState, executeQuery ] = useQueryApi(true)
  const { executeCommand } = useMyBeersCommandApi(true)

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/beer/beer?id=${id}`)
  }, [])

  const handleClose = (reason) =>
  {
    if (reason === 'clickaway')
    {
      return;
    }
    setOpen(false)
  }

  const handleAddBeer = () =>
  {
    executeCommand(`${config.myBeerApiUrl}/user/add-beer?productId=${selectedBeer.productId}`);
  }

  const handleSaveBeer = () =>
  {
    props.history.push(`/ratings/${queryState.data.id}`)
  }

  const priceFormatter = (price) => {

    if (price.toString().includes('.')) {
      return String(price).split('.').join(':') + '0 kr'
    }
    return price + " kr";
  }

  useEffect(() =>
  {
    queryState.data && setSelectedBeer(queryState.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryState])

  return (
    <>
      {selectedBeer ?
        <Card className="details-card">
          <CardMedia image={selectedBeer.imageUrl} style={contentStyle} />
          <Typography style={sectionStyle} variant="overline" >{selectedBeer.type}</Typography>
          <Typography variant="h5">{selectedBeer.name}</Typography>
          <Typography style={sectionStyle} variant="caption">Tillverkad i {selectedBeer.country}, {selectedBeer.state}, {selectedBeer.city}</Typography>
          <Box margin=".5em 0" display="flex" flexDirection="row" justifyContent="space-evenly">
            <Typography variant="h5">{priceFormatter(selectedBeer.price)}</Typography>
            <VerticalLine />
            <Typography variant="h5">{selectedBeer.volume} ml</Typography>
            <VerticalLine />
            <Typography variant="h5">{selectedBeer.alcoholPercentage} %</Typography>
          </Box>
          <Typography style={sectionStyle} variant="body1">{selectedBeer.taste}</Typography>
          <CardActions >
            <Box justifyContent="space-between" display="flex" width="100%">
              <Button onClick={handleSaveBeer} style={{color: "#fff"}} variant="contained" color="secondary">Rate it</Button>
              <Button onClick={handleAddBeer} size="medium" variant="outlined">Add to list</Button>
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
        prod={selectedBeer && selectedBeer.name}
        action=' was added' />
    </>
  )
}

export default SearchDetails