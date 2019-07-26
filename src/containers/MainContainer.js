import React from 'react'
import ControllerContainer from './ControllerContainer'
import GroupContainer from './GroupContainer'
import EventContainer from './EventContainer'
import GroupShow from '../components/GroupShow'
import EventForm from '../components/EventForm'

const API = 'http://localhost:3000/groups'

export default class MainContainer extends React.Component {
  state = {
    groups: [],
    events: [],
    toggleView: 'group',
    selectedGroup: null,
    selectedEvent: 1,
    newEvent: false
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(groups => {
      this.setState({
        groups: groups,
        events: groups.map(group => group.events).flat()
      })
    })
  }

  changeToGroupView = () => {
    this.setState((prevState) => ({
      toggleView: 'group',
      selectedGroup: null,
      newEvent: false
    }))
  }

  changeToEventView = () => {
    this.setState((prevState) => ({
      toggleView: 'event',
      selectedGroup: null,
      newEvent: false
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

  changeToEventForm = () => {
    this.setState({
      newEvent: true
    })
  }

  renderContainer = () => {
    if (this.state.selectedGroup !== null) {
      return < GroupShow selectedGroup={this.state.groups.find(group => group.id === this.state.selectedGroup)} handleClick={this.selectGroup} changeToEventForm={this.changeToEventForm} newEvent={this.state.newEvent} groups={this.state.groups} />
    } else {
      if (this.state.toggleView === 'group') {
        return < GroupContainer groups={this.state.groups} changeSelectedGroup={this.changeSelectedGroup} />
      } else if (this.state.toggleView === 'event') {
        return < EventContainer events={this.state.events} selectedGroup={this.state.selectedGroup} handleClick={this.selectEvent} selectedEvent={this.state.selectedEvent}/>
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
