import React, { useState, useContext, useEffect } from 'react'
import { CircularProgress, Box } from '@material-ui/core'
import { useApiSearch } from '../Services/SystemetService'
import { SearchContext } from '../Components/Context/SearchContext'
import querryString from 'query-string'
import config from '../config'
import ProductCard from '../Components/Generic/ProductCard'


const Search = (props) =>
{
  const [searchText, setSearchText] = useState();

  const { searchData, setSearchData } = useContext(SearchContext);
  
  const [state, executeSearch] = useApiSearch(true)

  const handelKeyDown = (event) => {
    if (event.key === "Enter") {
      props.history.push("/search?query=" + searchText)
      executeSearch(`${config.myBeerApiUrl}/systemet?search=${searchText}`);
    }
  }

  useEffect(() =>
  {
    const param = querryString.parse(props.location.search)
    if (param.query)
    {
      if (!searchData) {
        executeSearch(`${config.myBeerApiUrl}/systemet?search=${param.query}`)
      }
    }
  }, [])

  useEffect(() => {
    state.data && setSearchData(state.data)
  }, [state.data])

  return (
    <div>
      <div className="search-bar-container">
        {/* <Link to={"/search?query=" + searchText}> */}
          <input
            className="search-bar-input"
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={(event) => handelKeyDown(event)}
            placeholder="Search for beer"
          />
        {/* </Link> */}
      </div>
      <div className='card-container'>
        {!state.loading ?
        <>
          {searchData && searchData.map(beer => (
            <Box marginBottom=".5em">
              <ProductCard key={beer.id} beer={beer} linkDestination={`/search/${beer.productNumber}`} />
            </Box>
          ))}
        </>
        :
        <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
          <CircularProgress color="secondary" size="100" />
        </Box>
        }
      </div>
    </div>
  )
}

export default Search