import React from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../Services/AuthenticationService'
import { Menu, MenuItem, IconButton } from '@material-ui/core/'
import AccountCircle from '@material-ui/icons/AccountCircle'
// import { UserContext } from '../Context/UserContext'

const MenuIcon = (props) =>
{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const profile = JSON.parse(localStorage.getItem('currentUser'));  

  const handleLogout = (event) =>
  {
    AuthService.Logout();
    handleClose(event);
  };

  const handleClose = () =>
  {
    setAnchorEl(null);
  };
  const handleMenu = event =>
  {
    setAnchorEl(event.currentTarget);
  };


  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {profile ? (
          <div>
            <Link to="/profile">
              <MenuItem onClick={handleClose}>{profile.username}</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
            <div>
              <Link to="/login">
                <MenuItem onClick={handleClose}>Login</MenuItem>
              </Link>
              <Link to="/register">
                <MenuItem onClick={handleClose}>Register</MenuItem>
              </Link>
            </div>
          )
        }
      </Menu>
    </div>
  )
}

export default MenuIcon