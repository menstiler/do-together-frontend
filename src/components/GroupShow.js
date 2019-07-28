import React from 'react'
import EventList from '../containers/EventList'
import EventForm from './EventForm'
import AddUsers from '../components/AddUsers'
import EventShow from '../components/EventShow'

export default class GroupShow extends React.Component {

  state = {
    selectedEvent: null,
    showEvent: false
  }

  handleClick = (id) => {
    this.setState({
      selectedEvent: id,
      showEvent: !this.state.showEvent
    })
  }

  render() {
    const { name, users, activities, events, id, creator } = this.props.selectedGroup
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
        {
          this.props.currentUser.id === parseInt(creator) && users.map(user => user.id).includes(this.props.currentUser.id)
          ?
          < button onClick={() => this.props.removeGroup(id)}>Delete Group</button>
          :
          null
        }
        </div>
        <div>
          <h3>Events</h3>
          < EventList key={id} events={events} parent="groupShow" handleClick={this.handleClick} />
          {
            this.state.showEvent ? < EventShow parent="groupShow" selectedEvent={events.find(event => event.id === this.state.selectedEvent)}/> : null
          }
        </div>
        <div>
          <h3>Members</h3>
          {users.map(user => {
              return <p>{user.name}</p>
            })}
          {
            users.map(user => user.id).includes(this.props.currentUser.id) ?
            <div>
              <h3>Add users</h3>
              <AddUsers
              users={this.props.users.filter(new_user => !users.map(user => user.id).includes(new_user.id))}
              addUsersToGroup={this.props.addUsersToGroup}
              selectedGroup={id}/>
            </div>
            :
            null
          }
        </div>
        <span>
          <button onClick={this.props.changeToEventForm}>Create Event</button>
        </span>
        {this.props.newEvent ? < EventForm group_id={id} groups={this.props.groups} /> : null}
      </div>
    )
  }
}
