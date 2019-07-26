import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'

class App extends React.Component {

  state = {
    currentUser: {
      "id": 1,
      "name": "Blaine Wilderman DVM",
      }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.state.currentUser.id}`)
    .then(resp => resp.json())
    .then(user => {
      this.setState({
        currentUsersEvents: user
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
