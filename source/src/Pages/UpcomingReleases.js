import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useApiSearch } from '../Services/SystemetService'
import config from '../config';
import ProductCard from '../Components/Generic/ProductCard';
import SelectRegion from '../Components/Upcoming/SelectRegion';
import ProgressCircle from '../Components/Generic/ProgressCircle';

export default () => {

  const {state, executeSearch} = useApiSearch(true);

  const [selected, setSelected] = useState("");
  
  const handleChange = (name) => {
    localStorage.setItem('selectedRegion', name);
    setSelected(name)
    executeSearch(`${config.myBeerApiUrl}/systemet/news/?region=${name}`); 
  }

  useEffect(() => {
    const region = localStorage.getItem('selectedRegion')
    setSelected(region);
    executeSearch(`${config.myBeerApiUrl}/systemet/news/?${region ? 'region=' + region : ''}`) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <SelectRegion selected={selected && selected} handleChange={handleChange} /> 
      {state.data &&
        state.data.map(beer => (
          <Box marginBottom=".7em" key={beer.productId} >
            <ProductCard beer={beer} linkDestination={`/search/${beer.productId}`}/>
          </Box>
        ))
      }
      <ProgressCircle show={state.loading} />
    </div>
  )
}