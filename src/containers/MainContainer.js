import React from 'react'
import ControllerContainer from './ControllerContainer'
import GroupContainer from './GroupContainer'
import EventContainer from './EventContainer'

const API = 'http://localhost:3000/groups'

export default class MainContainer extends React.Component {
  state = {
    groups: [],
    events: [],
    toggleView: 'group'
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
      toggleView: 'group'
    }))
  }

  changeToEventView = () => {
    this.setState((prevState) => ({
      toggleView: 'event'
    }))
  }

  renderContainer = () => {
    if (this.state.toggleView === 'group') {
      return < GroupContainer groups={this.state.groups} />
    } else if (this.state.toggleView === 'event') {
      return < EventContainer events={this.state.events} />
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
