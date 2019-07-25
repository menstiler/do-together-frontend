import React from 'react'
import EventList from './EventList'
import EventShow from '../components/EventShow'

export default class EventContainer extends React.Component {
  render() {
    return (
      <div>
        < EventList events={this.props.events} handleClick={this.props.handleClick} selectedGroup={this.props.selectedGroup} />
        < EventShow selectedEvent={this.props.events.find(eventItem => eventItem.id === this.props.selectedEvent)}/>
      </div>
    )
  }
}
