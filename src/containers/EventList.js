import React from 'react'
import EventCard from '../components/EventCard'

export default class EventList extends React.Component {
  renderEventCards = () => {
    return this.props.events.filter(event => event.name.toLowerCase().includes(this.props.searchTerm.toLowerCase())).map(eventItem => {
      return < EventCard key={eventItem.id} eventItem={eventItem} handleClick={this.props.handleClick} selectedGroup={this.props.selectedGroup}/>
    })
  }

  render() {
    return (
      <div>
        {this.renderEventCards()}
      </div>
    )
  }
}
