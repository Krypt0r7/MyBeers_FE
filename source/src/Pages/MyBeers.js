import React, { useEffect, useState, useContext } from 'react'
import { useQueryApi, useUpdateApi } from '../Services/MyBeersService'
import { ErrorContext } from '../Components/Context/ErrorContext';
import config from '../config'
import ProductCard from '../Components/Generic/ProductCard';
import { Box } from '@material-ui/core';

const MyBeers = () =>
{
  const [beers, setBeers] = useState();
  const { setError } = useContext(ErrorContext);

  const [queryState, executeQueryState] = useQueryApi(true)
  const {executeUpdate} = useUpdateApi(true)

  useEffect(() =>
  {
    executeQueryState(`${config.myBeerApiUrl}/beer/by-user`);
  }, []);
  
  useEffect(() => {
    queryState && setBeers(queryState.data);
  }, [queryState.data])

  const handleDelete = async (id) =>
  {
    executeUpdate(`${config.myBeerApiUrl}/user/remove-beer?beerId=${id}`);
    const newBeers = beers.filter(beer => beer.id !== id);
    queryState.error && setError(queryState.error)
    setBeers(newBeers)
  }

  return (
    <div className='card-container'>
      {beers && beers.map((beer) => (
        <Box marginBottom=".5em">
          <ProductCard key={beer.id} beer={beer.beerData} beerId={beer.id} linkDestination={`/mybeer/${beer.id}`}  />
        </Box>
      ))}
    </div>
  )
}

export default MyBeers