import React, { useEffect, useState, useContext } from 'react'
import { useQueryApi } from '../Services/MyBeersService'
import { ErrorContext } from '../Components/Context/ErrorContext';
import config from '../config'
import ProductCard from '../Components/Generic/ProductCard';
import { Box } from '@material-ui/core';

const MyBeers = () =>
{
  const [beers, setBeers] = useState();
  const { setError } = useContext(ErrorContext);

  const [queryState, executeQuery] = useQueryApi(true)

  useEffect(() =>
  {
    executeQuery(`${config.myBeerApiUrl}/beer/by-user`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() =>
  {
    queryState && setBeers(queryState.data);
    queryState.error && setError(queryState.error.response.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryState])

  return (
    <div className='card-container'>
      {beers && beers.map((beer) => (
        <Box marginBottom=".5em" key={beer.id}>
          <ProductCard beer={beer.beerData} beerId={beer.id} linkDestination={`/mybeers/${beer.id}`} />
        </Box>
      ))}
    </div>
  )
}

export default MyBeers