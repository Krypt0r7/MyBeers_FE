import React from 'react'
import MenuBarIcon from './MenuIcon'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'

const MenuBar = (props) =>
{

  const [auth] = React.useState(true);


  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={props.open(true)} edge='start' color='inherit'>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            My Beers App
                    </Typography>
          {auth && (
            <div className="userIcon">
              <MenuBarIcon />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuBar