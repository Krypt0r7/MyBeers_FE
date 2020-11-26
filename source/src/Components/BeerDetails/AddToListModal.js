import React from 'react'
import BasicModal from '../Generic/BasicModal/BasicModal'
import { List, ListSubheader, ListItem, ListItemText, Box } from '@material-ui/core'

const AddToListModal = ({lists, open, close}) => {
return (
  <BasicModal
    open={open}
    fullScreen={false}
    fullWidth
    handleClose={() => close(false)}
    backAction={() => close(false)}>
      <div>
        <List>
          {['MyLists', 'Collaborating on'].map((name, index) => (
            <li key={index}>
              <ul>
                <ListSubheader>{name}</ListSubheader>
                {lists && (
                  index === 0 ? lists.myLists.map(list => (
                    <ListItem key={list.id}>
                      <Box display="flex">
                        <ListItemText>{list.name}</ListItemText>
                        
                      </Box>
                    </ListItem>
                  ))
                  :
                  lists.collaborateLists.map(list => (
                    <ListItem key={list.id}>
                      <ListItemText>{list.name}</ListItemText>
                    </ListItem>
                  ))
                )
                }
              </ul>
            </li>
          ))}
        </List>
      </div>
    </BasicModal>
  )
}

export default AddToListModal