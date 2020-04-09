import React from 'react'
import { Box, Slider, Input, InputLabel } from '@material-ui/core'

const InputSlider = ({ value, name, label, change, style, max = 100 }) =>
{

  const inputStyle = {
    width: "80%"
  }

  const handleSliderChange = (event, newValue) =>
  {
    change(name, newValue)
  }
  const handleInputChange = event =>
  {
    change(name, event.target.value === "" ? 0 : Number(event.target.value))
  }



  return (
    <div style={{ ...style }}>
      <InputLabel shrink>{label}</InputLabel>
      <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
        <Slider
          style={inputStyle}
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          color="secondary"
          max={max}
        />
        <Input
          value={value}
          margin="dense"
          onChange={handleInputChange}
          inputProps={{
            min: 0,
            max: max,
            type: "number",
          }}
        />
      </Box>
    </div>
  )
}

export default InputSlider