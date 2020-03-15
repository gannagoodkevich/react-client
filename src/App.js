import React, { Component } from 'react';
import './App.css';
import ListsContainer from './components/ListsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello World!</h1>
          <ListsContainer />
        </header>
      </div>
    );
  }
}

export default App;
