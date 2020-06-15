import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'

export default ({value, name, save, state, setState}) =>  {


  const [disabled, setDisabled] = useState(true);
  
  const Icon = () => {
    if (disabled) {
      return <EditIcon onClick={handleEdit}/>
    }
    return <SaveIcon onClick={handleSave}/>
    
  }

  const handleEdit = () => {
    setDisabled(false);
  }

  const handleSave = () => {
    setDisabled(true)
    save();
  }

  const handleSetState = (value) => {
    setState({...state, [name]: value})
  }

  return(
    <div className="text-input-with-icon">
      <input disabled={disabled} onChange={(event) => handleSetState(event.target.value)} defaultValue={value}/>
      <Icon />
    </div>
  )
}