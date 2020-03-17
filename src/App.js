import React, { Component } from 'react';
import './App.css';
import ListsContainer from './components/ListsContainer';
import NavbarLight from './components/NavbarLight';

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavbarLight />
        <div className="content">
          <ListsContainer />
        </div>
      </div>
    );
  }
}

export default App;
