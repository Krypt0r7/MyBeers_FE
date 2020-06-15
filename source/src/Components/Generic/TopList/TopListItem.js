import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography, ListItemIcon } from '@material-ui/core'
import ArrowIcon from '@material-ui/icons/ArrowForward'


export default ({image, name, rating, index}) =>
{
  return (
    <div>
      <ListItem button>
        <ListItemAvatar>
          <Avatar src={image} />
        </ListItemAvatar>
        <ListItemText>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginRight="1em">
            <Box display="flex" alignItems="center">
              <Typography variant="h6">{index + 1}.</Typography>
              <Typography className="top-list-text" variant="overline">{name}</Typography>
            </Box>
            <Typography variant="subtitle1" style={{fontWeight: "bold"}}>{rating}</Typography>
          </Box>
        </ListItemText>
        <ListItemIcon style={{ minWidth: "0" }}>
          <ArrowIcon />
        </ListItemIcon>
      </ListItem>
    </div>
  )
}