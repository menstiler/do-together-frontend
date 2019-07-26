import React from 'react'
import EventList from '../containers/EventList'

export default class GroupShow extends React.Component {

  render() {
    const { name, users, activities, events, id } = this.props.selectedGroup

    console.log(users)
    debugger
    return (
      <div>
        <h2>{name}</h2>
        <div>
        {
          users.map(user => user.id).includes(this.props.currentUser.id)
          ?
          < button onClick={() => this.props.removeUser(this.props.currentUser.id, id)}>Leave Group</button>
          :
          < button onClick={() => this.props.addUser(this.props.currentUser.id, id)}>Join Group</button>
        }
        </div>
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
