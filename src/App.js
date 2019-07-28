import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'

class App extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/1`)
    .then(resp => resp.json())
    .then(user => {
      this.setState({
        currentUser: user
      })
    })
  }


  render() {
    return (
      <div>
        < NavBar />
        < MainContainer currentUser={this.state.currentUser} />
      </div>
    )
  }
}

export default App
