import React from 'react'
import EventList from '../containers/EventList'
import EventForm from './EventForm'
import EventShow from '../components/EventShow'
import { Link } from 'react-router-dom'

export default class GroupShow extends React.Component {

  state = {
    selectedEvent: null,
    showEvent: false
  }

  handleClick = (id) => {
    if (id === this.state.selectedEvent) {
      this.setState({
        showEvent: !this.state.showEvent
      })
    } else {
      this.setState({
        selectedEvent: id,
        showEvent: true
      })
    }
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
          < button onClick={() => this.props.addUser(this.props.currentUser, id)}>Join Group</button>
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
          < EventList key={id} events={events} parent="groupShow" handleClick={this.handleClick} searchTerm={this.props.searchTerm} />
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
              <button onClick={() => this.props.passUsers(users, this.props.selectedGroup)}>Add Members</button>
            </div>
            :
            null
          }
        </div>
        <span>
        {
          users.map(user => user.id).includes(this.props.currentUser.id) ?
          <Link to={`/events/${id}/new`} ><button onClick={this.props.changeToEventForm}>Create Event</button></Link>
          :
          null
        }
        </span>
      </div>
    )
  }
}
