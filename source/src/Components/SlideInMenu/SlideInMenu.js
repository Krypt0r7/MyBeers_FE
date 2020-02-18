import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import DrinkIcon from '@material-ui/icons/LocalDrink'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'


const SlideInMenu = (props) =>
{

  return (
    <div
      className="drawerList"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}>
      <Drawer
        open={props.open}
        onClose={props.toggleDrawer(false)}>
        <List>
          <Link to="/">
            <ListItem button key="Home" >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/mybeers">
            <ListItem button key="MyBeers">
              <ListItemIcon><DrinkIcon /></ListItemIcon>
              <ListItemText primary="My beers" />
            </ListItem>
          </Link>
          <Link to="/search">
            <ListItem button key="Search">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Search beer" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  )
}

export default SlideInMenu