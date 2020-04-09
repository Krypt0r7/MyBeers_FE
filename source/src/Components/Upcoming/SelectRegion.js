import React from 'react'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Countries from '../../Data/countries.json'

export default ({selected, handleChange}) => {

  
  return (
    <div className="selectedRegionWrapper">
      <FormControl className="selectRegion">
        <InputLabel id="selectRegionLabel">Choose a region</InputLabel>
        <Select 
          onChange={(event) => handleChange(event.target.value)}
          labelId="selectRegionLabel"
          value={selected}
        >
          {Countries[0].regions.map((region, index) => (
            <MenuItem key={index} value={region}>{region}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}