import React from 'react'
import EventList from '../containers/EventList'
import EventForm from './EventForm'

export default class GroupShow extends React.Component {
  render() {
    const { name, users, activities, events, id } = this.props.selectedGroup

    return (
      <div>
        <h2>{name}</h2>
        <div>
          <h3>Events</h3>
          < EventList key={id} events={events} parent="groupShow" handleClick={this.props.handleClick} />
        </div>
        <div>
          <h3>Members</h3>
          {users.map(user => {
              return <p>{user.name}</p>
            })}
        </div>
        <span>
          <button onClick={this.props.changeToEventForm}>Create Event</button>
        </span>
        {this.props.newEvent ? < EventForm group_id={id} groups={this.props.groups} /> : null}
      </div>
    )
  }
}
