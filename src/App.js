import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Profile from './components/Profile'
import MainContainer from './containers/MainContainer'
import { Route, Switch } from 'react-router-dom'
const API = 'http://localhost:3000/groups'

class App extends React.Component {

  state = {
    currentUser: null,
    groups: [],
    newEvent: false,
    searchTerm: ''
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  componentDidMount() {
    localStorage.user_id = 1
    fetch(API)
    .then(resp => resp.json())
    .then(groups => {
      this.setState({
        groups: groups,
      }, () => {
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(resp => resp.json())
        .then(user => {
          this.setState({
            currentUser: user
          })
        })
      })
    })
  }

  changeToEventForm = () => {
    this.setState({
      newEvent: true
    })
  }

  addUser = (user, group_id) => {
    fetch('http://localhost:3000/user_groups', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_group: {
          user_id: user.id,
          group_id: group_id
        }
      })
    })
    .then(resp => resp.json())
    .then(json => {
      let updatedGroups = this.state.groups.map(group => {
        if (group.id === group_id) {
          group.users.push(user)
          return group
          console.log(group)
        } else {
          return group
        }
      })
      this.setState({
        groups: updatedGroups
      })
   })
  }

  removeUser = (user_id, group_id) => {
    fetch(`http://localhost:3000/groups/${group_id}/remove_user/${user_id}`, {
      method: "DELETE"
    })
    console.log(group_id);
    this.state.groups.find(group => group.id === group_id).users.splice(this.state.groups.find(group => group.id === group_id).users.findIndex(user => user.id === this.state.currentUser.id),1)
    let updatedGroups = this.state.groups
    this.setState({
      groups: updatedGroups
    })
  }

  addGroup = (newGroup) => {
    let updatedGroups = [...this.state.groups, newGroup]
    this.setState({
      groups: updatedGroups,
      selectedGroup: newGroup.id
    }, () => {
      this.props.history.push(`/groups/${newGroup.id}`)
    })
  }

  removeGroup = (group_id) => {
    this.setState({
      selectedGroup: null
    }, () => {
      fetch(`http://localhost:3000/groups/${group_id}`, {
        method: "DELETE"
      })
      let updatedGroups = [...this.state.groups].map(group => {
        if (group.id !== group_id) {
          return group
        }
      }).filter(function( element ) {
        return element !== undefined;
      })
      this.setState({
        groups: updatedGroups,
      }, () => this.props.history.push('/groups'))
    })
  }

  addUsersToGroup = (event, group_id, users) => {
    event.preventDefault()
    users.forEach(user => {
      this.addUser(user, group_id)
    })
    this.props.history.push(`/groups/${group_id}`)
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} />
        <Switch>
          <Route path="/profile" render={() => < Profile
            currentUser={this.state.currentUser}
            searchTerm={this.state.searchTerm} />
          } />
          <Route path="/" render={(routerProps) => {
            return (
              <MainContainer currentUser={this.state.currentUser}
              addUser={this.addUser}
              addGroup={this.addGroup}
              handleClick={this.selectEvent}
              removeUser={this.removeUser}
              removeGroup={this.removeGroup}
              addUsersToGroup={this.addUsersToGroup}
              changeToEventForm={this.changeToEventForm}
              newEvent={this.state.newEvent}
              groups={this.state.groups}
              {...routerProps}
              searchTerm={this.state.searchTerm}
              handleChange={this.handleChange} />
            ) }}/>
        </Switch>
      </div>
    )
  }
}

export default App
