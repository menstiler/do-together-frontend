import React from 'react'
import EventList from './EventList'
import EventShow from '../components/EventShow'

export default class EventContainer extends React.Component {
  state = {
    selectedEvent: 1

  }

  handleClick = (id) => {
    this.setState({
      selectedEvent: id
    })
  }

  render() {
    return (
      <div>
        < EventList events={this.props.events} handleClick={this.handleClick} />
        < EventShow selectedEvent={this.props.events.find(eventItem => eventItem.id === this.state.selectedEvent)}/>
      </div>
    )
  }
}
