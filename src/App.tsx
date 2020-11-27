import React from 'react';
import './App.css';
import MainRouter from './mainRouter/MainRouter';
import MyAppBar from './myAppBar/MyAppBar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MainRouter></MainRouter>
        </header>
      </div>
    );
  }
}

export default App;
