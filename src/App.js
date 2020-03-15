import React, { Component } from 'react';
import './App.css';
import ListsContainer from './components/ListsContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ListsContainer />
        </header>
      </div>
    );
  }
}

export default App;
