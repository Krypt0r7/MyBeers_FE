import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'

export default ({value, save, name}) =>  {


  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState();
  
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
    save(state ? state : value, name)
  }

  return(
    <div className="text-input-with-icon">
      <input disabled={disabled} onChange={(event) => setState(event.target.value)} defaultValue={value}/>
      <Icon />
    </div>
  )
}