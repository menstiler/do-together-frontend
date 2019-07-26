import React from 'react'
import EventList from '../containers/EventList'
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
          < EventList events={events} parent="groupShow" handleClick={this.props.handleClick} />
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
      </div>
    )
  }
}
