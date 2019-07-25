import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'

class App extends React.Component {
  render() {
    return (
      <div>
        < NavBar />
        < MainContainer />
      </div>
    )
  }
}

export default App
