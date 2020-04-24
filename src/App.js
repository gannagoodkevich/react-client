import React, { Component } from 'react';
import './App.css';
import ListsContainer from './components/ListsContainer';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import UserLogin from "./components/UserLogin";

import {createMuiTheme} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import ButtonAppBar from "./components/NavbarLight";

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
          <nav className="navbar navbar-light">
              <ul className="nav navbar-nav">
                  <li><Link to="/homepage">Home</Link></li>
                  <li><Link to="/">Login</Link></li>
              </ul>
          </nav>

          <Switch>
              <Route exact path="/homepage" component={ListsContainer}/>
              <Route path="/" component={UserLogin}/>
          </Switch>
              </BrowserRouter>
      </div>


    );
  }
}



export default App;
