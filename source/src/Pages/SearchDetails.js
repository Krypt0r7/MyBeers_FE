import React,  { useEffect, useState, useContext } from 'react'
import {useParams} from 'react-router'
import { SearchContext } from '../Components/Context/SearchContext';
import { GetSingleBeer } from '../Services/SystemetService';
import { Card, Typography, CardMedia } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'


const SearchDetails = () => {

  const contentStyle = {
    height: "55vh",
    backgroundSize: "contain",
    marginBottom: "1em"
  }

  const circularStyle = {
    color: "#3F88C5"
  }

  const {id} = useParams();
  const [selectedBeer, setSelectedBeer] = useState();
  const {searchData} = useContext(SearchContext);

  const searchResult = searchData && searchData.find(beer => beer.productNumber == id)

  const getSelectedBeerFromApi = async () =>  { setSelectedBeer(await GetSingleBeer(id)) }

  useEffect(() => {
   searchResult ? setSelectedBeer(searchResult) : getSelectedBeerFromApi()
  }, [])
  
  return (
    <Card className="details-card">
        {selectedBeer ?
          <>
            <CardMedia image={selectedBeer.imageUrl} style={contentStyle}/>
            <Typography variant="overline" >{selectedBeer.beverageDescriptionShort}</Typography>
            <Typography variant="h5">{selectedBeer.productName}</Typography>
            <Typography variant="caption">Tillverkad i {selectedBeer.country}, {selectedBeer.originLevel1}</Typography>
          </>
          :
          <CircularProgress style={circularStyle}  />
        }
    
    </Card>
  )
}

export default SearchDetails