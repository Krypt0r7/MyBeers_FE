import React, { useState, useContext, useEffect } from 'react'
import { useApiSearch } from '../Services/SystemetService'
import { SearchContext } from '../Components/Context/SearchContext'
import querryString from 'query-string'
import config from '../config'
import ProductCard from '../Components/Generic/ProductCard'
import { ErrorContext } from '../Components/Context/ErrorContext'
import ProgressCircle from '../Components/Generic/ProgressCircle'
import { Box, Fab } from '@material-ui/core'
import AdvancedSearchDialog from '../Components/Search/AdvancedSearchDialog'


const Search = (props) =>
{
  const [searchText, setSearchText] = useState();
  const [advancedSearch, setAdvancedSearch] = useState({
    type: "",
    region: "",
    priceMax: 0,
    priceMin: 0,
    alcoholMax: 0,
    alcoholMin: 0,
    country: "",
    style: "",
    searchString: ""
  })
  const [open, setOpen] = useState(false);
  const { searchData, setSearchData } = useContext(SearchContext);
  const {state, executeSearch} = useApiSearch(true)
  const {setError} = useContext(ErrorContext)

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  }

  const iconStyle = {
    width: "35px"
  }

  const handelKeyDown = (event) => {
    if (event.key === "Enter") {
      props.history.push("/search?query=" + searchText)
      executeSearch(`${config.myBeerApiUrl}/systemet?search=${searchText}`);
    }
  }

  const handleFilterOpen = () => {
    setOpen(true)
  }
  const handleAdvancedSearch = () => {
    setOpen(false)
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
      <Fab style={fabStyle} color="secondary" onClick={handleFilterOpen} title="Advanced search">
        <img alt="Advanced search icon" style={iconStyle} src={process.env.PUBLIC_URL + "/advanced.png"} />
      </Fab>
      <AdvancedSearchDialog open={open} search={handleAdvancedSearch} data={advancedSearch} setData={setAdvancedSearch}/> 
    </div>
  )
}

export default Search