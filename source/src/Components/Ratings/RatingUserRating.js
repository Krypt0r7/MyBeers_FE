import React from 'react'
import { Box, Avatar, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import MoreVert from '@material-ui/icons/MoreVert'
import moment from 'moment'

export default ({username, rating, created, open, isOwner = false}) =>
{
  const formatDate = (date) =>
  {
    return (
      moment(date).format('DD-MM-YYYY')
    )
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-end">
      <Box display="flex" alignItems="center">
        <Avatar />
        <Box marginLeft=".6em">
          <Typography>{username} </Typography>
          <Box display="flex">
            <Rating size="small" name="myrating" value={rating} />
            <Typography variant="caption">&nbsp; {formatDate(created)}</Typography>
          </Box>
        </Box>
      </Box>
      {isOwner &&
        <MoreVert onClick={open} />
      }
    </Box>
  )
}