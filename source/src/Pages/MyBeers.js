import React, { useEffect, useState, useContext } from 'react'
import { useQueryApi, useMyBeersCommandApi } from '../Services/MyBeersService'
import { ErrorContext } from '../Components/Context/ErrorContext';
import config from '../config'
import ProductCard from '../Components/Generic/ProductCard';
import { Box } from '@material-ui/core';

const MyBeers = () =>
{
  const [beers, setBeers] = useState();
  const { setError } = useContext(ErrorContext);
  
  const {executeCommand} = useMyBeersCommandApi(true);
  const [queryState, executeQuery] = useQueryApi(true)

  const handleDelete = async (id) =>
  {
    executeCommand(`${config.myBeerApiUrl}/user/remove-beer?beerId=${id}`);    
    setBeers(beers.filter(x => x.id !== id))
  }

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
          <ProductCard rate={true} beer={beer.beerData} beerId={beer.id} linkDestination={`/beer/${beer.id}`} remove={() => handleDelete()} />
        </Box>
      ))}
    </div>
  )
}

export default MyBeers