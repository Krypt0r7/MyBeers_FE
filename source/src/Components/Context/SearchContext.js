import React, {createContext, useState} from 'react'

export const SearchContext = createContext();

export default function SearchProvider ({ children }){
  const [searchData, setSearchData] = useState();

  return (
    <SearchContext.Provider value={{searchData, setSearchData}} >
      {children}
    </SearchContext.Provider>
  )
}