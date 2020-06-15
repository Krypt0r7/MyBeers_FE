import React, { useState, useContext, useEffect } from 'react'
import { useQueryApi } from '../Services/MyBeersService'
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
  const [queryState, executeQuery] = useQueryApi(true)
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
      executeQuery(`${config.myBeerApiUrl}/beer/search?searchString=${searchText}`);
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
      executeQuery(`${config.myBeerApiUrl}/beer/search?searchString=${param.query}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
        {queryState.data &&
        <>
          {queryState.data.map(beer => (
            <Box marginBottom=".5em" key={beer.id} >
              <ProductCard beer={beer} linkDestination={`/search/${beer.id}`} />
            </Box>
          ))}
        </>
        
        }
        <ProgressCircle show={queryState.loading}/>
      </div>
      <Fab style={fabStyle} color="secondary" onClick={handleFilterOpen} title="Advanced search">
        <img alt="Advanced search icon" style={iconStyle} src={process.env.PUBLIC_URL + "/advanced.png"} />
      </Fab>
      <AdvancedSearchDialog open={open} search={handleAdvancedSearch} data={advancedSearch} setData={setAdvancedSearch}/> 
    </div>
  )
}

export default Search