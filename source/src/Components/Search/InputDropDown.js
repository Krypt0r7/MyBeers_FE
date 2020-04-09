import React from 'react'
import { FormControl, InputLabel, Select, Input, MenuItem, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const InputDropDown = ({name, change, data, value, label, style}) =>
{
  return (
    <Box display="flex" alignItems="center" jsutifyContent="space-between">
      <FormControl fullWidth style={{...style}}>
        <InputLabel shrink>{label}</InputLabel>
        <Select
          name={name}
          displayEmpty
          value={value}
          fullWidth
          onChange={(event) => change(name, event.target.value)}
          input={<Input />}>
          <MenuItem disabled value="">{`Choose a ${name}`}</MenuItem>
          {data.map(dataItem => (
            <MenuItem key={dataItem} value={dataItem}>{dataItem}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <CloseIcon onClick={(() => change(name, ""))} style={{marginLeft: ".5em"}} />
    </Box>
  )
}

export default InputDropDown