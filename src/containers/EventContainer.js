import React from 'react'
import EventList from './EventList'
import EventShow from '../components/EventShow'

export default class EventContainer extends React.Component {

  render() {
    return (
      <div className="event-row">
        < EventList events={this.props.events}
          handleClick={this.props.selectEvent}
          selectedGroup={this.props.selectedGroup}
          searchTerm={this.props.searchTerm}
          />
        {
          this.props.selectedEvent === null
          ?
          null
          :
          < EventShow
          currentUser={this.props.currentUser}
          selectedEvent={this.props.events.find(event => event.id === this.props.selectedEvent)}
          cancelAttendee={this.props.cancelAttendee}
          changeState={this.props.changeState}
          parent={this.props.parent}
          />
        }
      </div>
    )
  }
}
