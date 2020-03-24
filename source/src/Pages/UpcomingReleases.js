import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useApiSearch } from '../Services/SystemetService'
import config from '../config';
import ProductCard from '../Components/Generic/ProductCard';
import SelectRegion from '../Components/Upcoming/SelectRegion';

export default () => {

  const {state, executeSearch} = useApiSearch(true);
  const [selected, setSelected] = useState('')
  
  useEffect(() => {
    selected && localStorage.setItem('selectedRegion', selected);
    executeSearch(`${config.myBeerApiUrl}/systemet/news/?region=${selected}`); 
  },[selected])
  
  useEffect(() => {
    const region = localStorage.getItem('selectedRegion')
    setSelected(region)
    executeSearch(`${config.myBeerApiUrl}/systemet/news/?${region ? 'region=' + region : ''}`) 
  }, [])

  return (
    <div>
      <SelectRegion state={selected} setState={setSelected} /> 
      {state.data &&
        state.data.map(beer => (
          <Box marginBottom=".7em" key={beer.productId} >
            <ProductCard beer={beer} linkDestination={`/search/${beer.productNumber}`}/>
          </Box>
        ))
      }
    </div>
  )
}