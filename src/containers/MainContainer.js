import React from 'react'
import ControllerContainer from './ControllerContainer'
import GroupContainer from './GroupContainer'
import EventContainer from './EventContainer'
import GroupShow from '../components/GroupShow'
import GroupForm from '../components/GroupForm'

const API = 'http://localhost:3000/groups'

export default class MainContainer extends React.Component {
  state = {
    groups: [],
    toggleView: 'group',
    selectedGroup: null,
    selectedEvent: 1,
    currentUser: {
      "id": 1,
      "name": "Romeo Leannon",
      "created_at": "2019-07-25T20:57:36.292Z",
      "updated_at": "2019-07-25T20:57:36.292Z"
      }
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(groups => {
      this.setState({
        groups: groups,
      })
    })
  }

  changeToGroupView = () => {
    this.setState((prevState) => ({
      toggleView: 'group',
      selectedGroup: null
    }))
  }

  changeToEventView = () => {
    this.setState((prevState) => ({
      toggleView: 'event',
      selectedGroup: null
    }))
  }

  changeSelectedGroup = (id) => {
    this.setState({
      selectedGroup: id
    })
  }

  selectEvent = (id) => {
    this.setState({
      selectedEvent: id
    })
  }

  addUser = (user_id, group_id) => {
    fetch('http://localhost:3000/user_groups', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_group: {
          user_id: user_id,
          group_id: group_id
        }
      })
    })
    .then(resp => resp.json())
    .then(json => {
      let updatedGroups = this.state.groups.map(group => {
        if (group.id === group_id) {
          group.users.push(this.state.currentUser)
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
    let updatedGroups = this.state.groups.map(group => {
      if (group.id === group_id) {
        let userIndex = group.users.indexOf(this.state.currentUser)
        group.users.splice(userIndex, 1)
        return group
        console.log(group)
      } else {
        return group
      }
    })
    debugger
    this.setState({
      groups: updatedGroups
    })
  }

  addGroup = (newGroup) => {
    let updatedGroups = [...this.state.groups, newGroup]
    this.setState({
      groups: updatedGroups,
      selectedGroup: newGroup.id
    })
  }

  renderContainer = () => {
    if (this.state.selectedGroup !== null) {
      return (
        < GroupShow
        addUser={this.addUser}
        selectedGroup={this.state.groups.find(group => group.id === this.state.selectedGroup)}
        handleClick={this.selectEvent}
        currentUser={this.state.currentUser}
        removeUser={this.removeUser} />
      )
    } else {
      if (this.state.toggleView === 'group') {
        return (
          <div>
            < GroupContainer groups={this.state.groups} changeSelectedGroup={this.changeSelectedGroup} currentUser={this.state.currentUser} />
            < GroupForm addUser={this.addUser} addGroup={this.addGroup} currentUser={this.state.currentUser} />
          </div>
        )
      } else if (this.state.toggleView === 'event') {
        return < EventContainer events={this.state.groups.map(group => group.events).flat()} selectedGroup={this.state.selectedGroup} handleClick={this.selectEvent} selectedEvent={this.state.selectedEvent}/>
      }
    }
  }



  render() {
    return (
      <div>
        < ControllerContainer
        changeToGroupView={this.changeToGroupView}
        changeToEventView={this.changeToEventView} />
        {this.renderContainer()}
      </div>
    )
  }
}
