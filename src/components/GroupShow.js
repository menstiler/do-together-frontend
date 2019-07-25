import React from 'react'
import EventList from '../containers/EventList'

export default class GroupShow extends React.Component {
  render() {
    const { name, users, activities, events } = this.props.selectedGroup

    return (
      <div>
        <h2>{name}</h2>
        <div>
          <h3>Events</h3>
          < EventList events={events} parent="groupShow" handleClick={this.props.handleClick} />
        </div>
        <div>
          <h3>Members</h3>
          {users.map(user => {
              return <p>{user.name}</p>
            })}
        </div>
      </div>
    )
  }
}
