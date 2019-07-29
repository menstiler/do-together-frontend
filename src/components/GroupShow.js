import React from 'react'
import EventList from '../containers/EventList'
import EventForm from './EventForm'
import AddUsers from '../components/AddUsers'


export default class GroupShow extends React.Component {


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
          this.props.currentUser.id === parseInt(creator)
          ?
          < button onClick={() => this.props.removeGroup(id)}>Delete Group</button>
          :
          null
        }
        </div>
        <div>
          <h3>Events</h3>
          < EventList key={id} events={events} parent="groupShow" handleClick={this.props.handleClick} />
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
        {this.props.newEvent ? < EventForm group_id={id} events={this.props.events} activities={this.props.activities} hideActivityForm={this.props.hideActivityForm} addNewActivityForm={this.props.addNewActivityForm} addNewActivity={this.props.addNewActivity} showActivityForm={this.props.showActivityForm} addNewEvent={this.props.addNewEvent} /> : null}
      </div>
    )
  }
}