import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Input, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@material-ui/core'
import { useQueryApi } from '../../Services/MyBeersService';
import config from '../../config';

const AddBeerModal = ({open, handleClose, handleUpdate, listItems}) => {

  const [querryState, executeQuery] = useQueryApi()
  const [searchString, setSearchString] = useState(null)
  const [tableData, setTableData] = useState([])
  
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      executeQuery(`${config.myBeerApiUrl}/beer/search?searchString=${searchString}`)
    }
  }

  useEffect(() => { 
    const beerData = querryState.data && querryState.data.map((beer) => {
      const check = listItems.beers && listItems.beers.some(f => f.id === beer.id)

      return(
        {
          id: beer.id,
          name: beer.name,
          container: beer.container,
          alcohol: beer.alcohol,
          producer: beer.producer,
          prodId: beer.prodIdSystemet,
          check
        }
      )
    })
    
    setTableData(beerData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querryState.data])

  const handleSetingList = () => {
    const beers = tableData.filter(x => x.check)
    const items = [...listItems.beers, ...beers.filter(f => !listItems.beers.some(x => x.id === f.id))]
      
    handleUpdate({...listItems, beers: items});
    setTableData([])
  }

  const handleUpdateList = (index) => {
    const beer = {...tableData[index]}
    beer.check = !beer.check
    const data = [...tableData]
    data.splice(index, 1, beer)

    setTableData(data)
  }

  const cellStyle = {
    padding: "6px 2px 6px 10px"
  }

  const columns = [
    {
      id: 'name',
      label: 'Name'
    },
    {
      id: 'container',
      label: 'Container'
    },
    {
      id: 'alcohol',
      label: 'Alcohol'
    },
    {
      id: 'check',
      label: 'Added'
    }
  ]

  return (
    <Dialog 
      onEscapeKeyDown={handleClose} 
      open={open} 
      fullScreen>
      <DialogTitle>Search beer</DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='column'>
          <Box margin='1em 0'>
            <Input 
              onChange={(event) => setSearchString(event.target.value)}
              onKeyDown={(event) => handleSearch(event)} 
              placeholder="Search for beer" 
              fullWidth />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell style={cellStyle} size="small" key={column.id}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData && tableData.map((beer, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell style={cellStyle} size="small">
                        {beer.name}
                      </TableCell>
                      <TableCell style={cellStyle} size="small">
                        {beer.container}
                      </TableCell>
                      <TableCell style={cellStyle} size="small">
                        {beer.alcohol}
                      </TableCell>
                      <TableCell style={cellStyle} size="small">
                        <Checkbox checked={beer.check} onClick={() => handleUpdateList(index)} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSetingList}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddBeerModal
