import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography, ListItemIcon } from '@material-ui/core'
import ArrowIcon from '@material-ui/icons/ArrowForward'


export default ({image, name, index}) =>
{
  return (
    <div>
      <ListItem button>
        <ListItemAvatar>
          <Avatar src={image} />
        </ListItemAvatar>
        <ListItemText>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">{index + 1}.</Typography>
            <Typography className="top-list-text" variant="overline">{name}</Typography>
          </Box>
        </ListItemText>
        <ListItemIcon style={{ minWidth: "0" }}>
          <ArrowIcon />
        </ListItemIcon>
      </ListItem>
    </div>
  )
}