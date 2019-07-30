import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Profile from './components/Profile'
import MainContainer from './containers/MainContainer'
import { Route, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'

const API = 'http://localhost:3000'

class App extends React.Component {

  state = {
    currentUser: null,
    groups: [],
    newEvent: false,
    searchTerm: '',
    selectedEvent: 1,
    activities: []
  }

    setUser = (response) => {
     this.setState({
       currentUser: response.user
     }, () => {
       localStorage.token = response.token
       this.props.history.push("/groups")
     })

   }

   logout = () => {
     this.setState({
       currentUser: null
     }, () => {
       localStorage.removeItem("token")
       this.props.history.push("/login")
     })
   }

  selectEvent = (id) => {
    this.setState({
      selectedEvent: id,
    })
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  componentDidMount() {
    const token = localStorage.token
    // localStorage.user_id = 1
    if (token) {
      fetch(API + "/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          alert(response.errors)
        } else {
          this.setState({
            currentUser: response
          })
        }
      })
    }

    fetch(API + "/groups")
    .then(resp => resp.json())
    .then(groups => {
      this.setState({
        groups: groups,
      }, () => {
        fetch(API + "/activities")
        .then(resp => resp.json())
        .then(activities => {
          this.setState({
              activities: activities
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
   this.props.history.push(`/groups/${group_id}`)
  }

  removeUser = (user_id, group_id) => {
    fetch(`http://localhost:3000/groups/${group_id}/remove_user/${user_id}`, {
      method: "DELETE"
    })
    console.log(group_id)
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

  addNewActivity = (event, title, location, group_id) => {
    event.preventDefault()
    // this.hideActivityForm(event)

    fetch('http://localhost:3000/activities', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        title: title,
        location: location
      })
    })
    .then(res => res.json())
    .then(activity => {
      let updatedActivities = [...this.state.activities, activity]
      this.setState({
        activities: updatedActivities
      })
    })
  }

  addNewEvent = (event, name, time, group_id, activity_id, img_url) => {
    debugger
    event.preventDefault()
    this.setState({
      newEvent: false
    })

    fetch('http://localhost:3000/events', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        time: time,
        group_id: group_id,
        activity_id: activity_id
      })
    })
    .then(res => res.json())
    .then(newEvent => {
      let updatedGroups = this.state.groups.map(group => {
        if (group.id === group_id) {
          group.events.push(newEvent)
          return group
        } else {
          return group
        }
      })
      this.setState({
        groups: updatedGroups
      })
    })
    this.props.history.push(`/groups/${group_id}`)
  }

  addUsersToGroup = (event, group_id, users) => {
    event.preventDefault()
    users.forEach(user => {
      this.addUser(user, group_id)
    })
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} logout={this.logout} />
        <Switch>
          <Route path="/login" render={() => <LoginForm setUser={this.setUser}/>}/>
          <Route path="/profile" render={() => < Profile
            currentUser={this.state.currentUser}
            searchTerm={this.state.searchTerm}
            />
          } />
          <Route path="/" render={(routerProps) => {
            return (
              <MainContainer currentUser={this.state.currentUser}
              selectedEvent={this.state.selectedEvent}
              selectEvent={this.selectEvent}
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
              handleChange={this.handleChange}
              addNewEvent={this.addNewEvent}
              addNewActivity={this.addNewActivity}
              addNewActivityForm={this.addNewActivityForm}
              hideNewActivityForm={this.hideNewActivityForm}
              showActivityForm={this.state.showActivityForm}
              activities={this.state.activities}
              />
            ) }}/>
        </Switch>
      </div>
    )
  }
}

export default App
