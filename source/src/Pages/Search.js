import React, { useState, useContext, useEffect } from 'react'
import { useApiSearch } from '../Services/SystemetService'
import { SearchContext } from '../Components/Context/SearchContext'
import querryString from 'query-string'
import config from '../config'
import ProductCard from '../Components/Generic/ProductCard'
import { ErrorContext } from '../Components/Context/ErrorContext'
import ProgressCircle from '../Components/Generic/ProgressCircle'
import { Box } from '@material-ui/core'


const Search = (props) =>
{
  const [searchText, setSearchText] = useState();

  const { searchData, setSearchData } = useContext(SearchContext);
  
  const {state, executeSearch} = useApiSearch(true)

  const {setError} = useContext(ErrorContext)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData])

  useEffect(() => {
    state.data && setSearchData(state.data)
    
    if(state.data && state.data.length === 0){
      setError('No search result')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {state.data &&
        <>
          {searchData && searchData.map(beer => (
            <Box marginBottom=".5em" key={beer.productNumber} >
              <ProductCard beer={beer} linkDestination={`/search/${beer.productId}`} />
            </Box>
          ))}
        </>
        
        }
        <ProgressCircle show={state.loading}/>
      </div>
    </div>
  )
}

export default Search