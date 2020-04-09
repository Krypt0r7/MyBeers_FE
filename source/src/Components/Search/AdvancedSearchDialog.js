import React, {useEffect, useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@material-ui/core'
import InputDropDown from './InputDropDown'
import InputSlider from './InputSlider'
import types from '../../Data/types.json'
import countries from '../../Data/countries.json'
import InputTextField from './InputTextField'


const AdvancedSearchDialog = ({ open, search, data, setData }) =>
{
  const [regions, setRegions] = useState()
  const inputStyle = {
    marginBottom: ".5em"
  }


  const handleChange = (name, value) =>
  {    
    setData({...data, [name]: value})
  }

  useEffect(() => {
    if(data.country){
      const found = countries.find(x => x.eng === data.country).regions
      if(found){
        setRegions(found)
      }else{
        setRegions(undefined)
        setData({...data, "region": ""})
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.country])

  return (
    <Dialog
      open={open}
      fullScreen
    >
      <DialogTitle>Set filter</DialogTitle>
      <DialogContent>
        <Box width="100%">
          <InputTextField style={inputStyle} change={handleChange} label="Search text" name="searchString" value={data.searchString}/>
          <InputDropDown style={inputStyle} change={handleChange} data={types} name="type" value={data.type} label="Type" />
          <InputDropDown style={inputStyle} change={handleChange} data={countries.map(x => x.eng)} name="country" value={data.country} label="Country" />
          {regions &&
            <InputDropDown style={inputStyle} change={handleChange} data={regions} name="region" value={data.region} label="Region"/>
          }
          <InputSlider style={inputStyle} change={handleChange} name="priceMin" label="Price min" value={data.priceMin} /> 
          <InputSlider style={inputStyle} change={handleChange} name="priceMax" label="Price max" value={data.priceMax} /> 
          <InputSlider style={inputStyle} change={handleChange} name="alcoholMin" label="Alcohol min" max={20} value={data.alcoholMin} /> 
          <InputSlider style={inputStyle} change={handleChange} name="alcoholMax" label="Alcohol min" max={20} value={data.alcoholMax} /> 

        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="default" onClick={search}>Search</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdvancedSearchDialog