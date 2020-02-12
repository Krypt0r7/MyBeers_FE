import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import MenuBar from '../Menu/MenuBar'
import SlideInMenu from '../SlideInMenu/SlideInMenu'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import UserProvider from '../Context/UserContext'
import Index from '../../Pages/Index'
import MyBeers from '../../Pages/MyBeers'
import Login from '../../Pages/Login'
import Register from '../../Pages/Register'
import Search from '../../Pages/Search'



function App()
{
  const [state, setState] = useState({
    open: false
  })

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f9f9f9',
        light: '#ffffff',
        dark: '#c6c6c6'
      },
      secondary: {
        main: '#bdbdbd',
        light: '#efefef',
        dark: '#8d8d8d'
      }
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
      <Router>
        <UserProvider>
          <SlideInMenu open={state.open} toggleDrawer={toggleDrawer} />
          <MenuBar open={toggleDrawer} />
          <Route path="/" exact component={Index} />
          <Route path="/mybeers" component={MyBeers} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/search" component={Search} />
        </UserProvider>
      </Router>

      <footer></footer>

    </ThemeProvider>
  );
}

export default App;
