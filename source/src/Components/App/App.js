import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import MenuBar from '../Menu/MenuBar'
import SlideInMenu from '../SlideInMenu/SlideInMenu'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Index from '../../Pages/Index'
import Lists from '../../Pages/Lists'
import ListDetails from '../../Pages/ListDetails'
import Login from '../../Pages/Login'
import Register from '../../Pages/Register'
import Search from '../../Pages/Search'
import Profile from '../../Pages/Profile'
import SearchDetails from '../../Pages/SearchDetails'
import BeerDetails from '../../Pages/BeerDetails'
import Ratings from '../../Pages/Ratings'
import RatingDetails from '../../Pages/RatingDetails'
import ErrorDisplayBoundry from '../Context/ErrorContext';
import ErrorSnackbar from '../Generic/ErrorSnackBar';
import ProtectedRoute from '../Generic/ProtectedRoute';
import UpcomingReleases from '../../Pages/UpcomingReleases';
import UserDetails from '../../Pages/UserDetails'
import ChangeBeerInfo from '../../Pages/ChangeBeerInfo'


function App()
{
  const [state, setState] = useState({
    open: false
  })

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4A8FE7',
        light: '#ffffff',
        dark: '#c6c6c6'
      },
      secondary: {
        main: '#6BD5FF',
        light: '#efefef',
        dark: '#8d8d8d'
      },
      error: {
        main: '#D7263D',
      }

    },
    typography: {
      fontFamily: [
        '"Segoe UI"',
        'san-serif'
      ].join()
    }
  });

  const toggleDrawer = (open) => event =>
  {
    if (event.type === "keydown" && (event.key === "shift" || event.key === "tab"))
    {
      return;
    }
    setState({ ...state, open })
  }

  return (
    <ThemeProvider theme={theme}>
      <ErrorDisplayBoundry>
        <ErrorSnackbar />
        <Router>
          <SlideInMenu open={state.open} toggleDrawer={toggleDrawer} />
          <MenuBar open={toggleDrawer} />
          <Switch>
            <Route path="/" exact component={Index} />
            <ProtectedRoute path="/lists" exact component={Lists} />
            <ProtectedRoute path="/list/:id" component={ListDetails} />
            <ProtectedRoute path="/beer/:id" exact component={BeerDetails} />
            <ProtectedRoute path="/beer/:id/edit" component={ChangeBeerInfo} />
            <ProtectedRoute path="/profile" exact component={Profile} />
            <ProtectedRoute path="/profile/:id" component={UserDetails}/>
            <ProtectedRoute path="/ratings" exact component={Ratings} />
            <ProtectedRoute path="/ratings/:id" component={RatingDetails} />
            <ProtectedRoute path="/upcoming" component={UpcomingReleases} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/search" exact component={Search} />
            <Route path="/search/:id" component={SearchDetails} />
          </Switch>
        </Router>

      </ErrorDisplayBoundry>
    </ThemeProvider>
  );
}

export default App;
