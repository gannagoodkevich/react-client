import React, { Component } from 'react';
import './App.css';
import ListsContainer from './components/ListsContainer';
import {createMuiTheme} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import ButtonAppBar from "./components/NavbarLight";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content">
            <ListsContainer />
        </div>
      </div>
    );
  }
}

export default App;
