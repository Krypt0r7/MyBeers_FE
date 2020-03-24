import React, { useState } from 'react'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

export default ({state, setState}) => {


  const regions = [
    "Västra Götalands län",
    "Gotlands län",
    "Stockholms län"
  ]

  const handleChange = (event) => {
    setState(event.target.value)
  }
  return (
    <div className="selectedRegionWrapper">
      <FormControl className="selectRegion">
        <InputLabel id="selectRegionLabel">Choose a region</InputLabel>
        <Select onChange={handleChange}
          labelId="selectRegionLabel"
          value={state}>
          {regions.map((region, index) => (
            <MenuItem key={index} value={region}>{region}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}