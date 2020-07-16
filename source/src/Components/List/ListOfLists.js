import React from 'react'
import { Box, Card, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ListOfLists = ({lists}) => {
  return (
    <div>
      {lists && lists.map(list => (
        <Box margin=".5em" key={list.id}>
          <Card className="listCard">
            <Box padding="1em" display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{list.name}</Typography>
              <Link to={`/list/${list.id}`}>
                <Button variant="outlined">Edit</Button>
              </Link>
            </Box>
          </Card>
        </Box>
      ))}
    </div>
  )
}

export default ListOfLists