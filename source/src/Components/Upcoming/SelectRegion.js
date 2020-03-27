import React from 'react'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

export default ({selected, handleChange}) => {

  const regions = [
    "Västra Götalands län",
    "Stockholms län",
    "Skåne län",
    "Gotlands län",
    "Blekinge län",
    "Gävleborgs län",
    "Hallands län",
    "Jämtlands län",
    "Kalmar län",
    "Kronobergs län",
    "Norrbottens län",
    "Södermanlands län",
    "Uppsala län",
    "Värmlands län",
    "Västerbottens län",
    "Västernorrlands län",
    "Västmanlands län",
    "Örebro län",
    "Östergötlands län"
  ]

  
  return (
    <div className="selectedRegionWrapper">
      <FormControl className="selectRegion">
        <InputLabel id="selectRegionLabel">Choose a region</InputLabel>
        <Select onChange={(event) => handleChange(event.target.value)}
          labelId="selectRegionLabel"
          value={selected}>
          {regions.map((region, index) => (
            <MenuItem key={index} value={region}>{region}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}