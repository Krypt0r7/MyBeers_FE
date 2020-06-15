import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useQueryApi } from '../Services/MyBeersService'
import config from '../config';
import ProductCard from '../Components/Generic/ProductCard';
import SelectRegion from '../Components/Upcoming/SelectRegion';
import ProgressCircle from '../Components/Generic/ProgressCircle';

export default () => {

  const [queryState, executeQuery] = useQueryApi(true);

  const [selected, setSelected] = useState("");
  
  const handleChange = (name) => {
    localStorage.setItem('selectedRegion', name);
    setSelected(name)
    executeQuery(`${config.myBeerApiUrl}/beer/news/?region=${name}`); 
  }

  useEffect(() => {
    const region = localStorage.getItem('selectedRegion')
    setSelected(region);
    executeQuery(`${config.myBeerApiUrl}/beer/news/?${region ? 'region=' + region : ''}`) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <SelectRegion selected={selected && selected} handleChange={handleChange} /> 
      {queryState.data &&
        queryState.data.map(beer => (
          <Box marginBottom=".7em" key={beer.productId} >
            <ProductCard beer={beer} linkDestination={`/search/${beer.id}`}/>
          </Box>
        ))
      }
      <ProgressCircle show={queryState.loading} />
    </div>
  )
}