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
    console.log(users)

    return (
      <div id="group-show">
        <h2 className="headers">{name}</h2>
        {
          !users.map(user => user.id).includes(this.props.currentUser.id)
          ?
          <div className="ui labeled button" tabindex="0" onClick={() => this.props.addUser(this.props.currentUser, id)}>
            <div class="ui button blue right">
              <i class="child icon"></i>
              Join Group
            </div>
            <a class="ui basic label" >
              {users.length}
            </a>
          </div>
          :
          <div className="ui labeled disabled button" tabindex="0" onClick={() => this.props.addUser(this.props.currentUser, id)}>
            <div class="ui button blue right">
              <i class="users icon"></i>
              Joined Group
            </div>
            <a class="ui basic label" >
              {users.length}
            </a>
          </div>
        }
        <div style={{paddingTop: "1%"}}>
          <h3 className="headers">Events</h3>
          < EventList key={id} events={events} parent="groupShow" handleClick={this.handleClick} searchTerm={this.props.searchTerm} />
          <div className="event-row">
            {
              this.state.showEvent ? < EventShow parent="groupShow" selectedEvent={events.find(event => event.id === this.state.selectedEvent)}/> : null
            }
          </div>
        </div>
        <div>
          <h3 className="headers">Members</h3>
          <div className="ui cards">
          {users.map(user => {
              return  (
                <div className="ui card">
                <div className="content name-card">
                  <h3 style={{margin: "0"}}>{user.name}</h3>
                  <img className="ui avatar image icons" src={`/icons/${user.image}`} alt="" />
                </div>
              </div>
              )
            }) }
          </div>
        </div>
        <div style={{padding: "1%", paddingTop: "2%"}}>
          {
            users.map(user => user.id).includes(this.props.currentUser.id) ?
            <div>
              <button onClick={() => this.props.passUsers(users, this.props.selectedGroup)} className="ui primary button">Add Members</button>
            </div>
            :
            null
          }
        </div>
        <div style={{padding: "1%"}}>
          {
            users.map(user => user.id).includes(this.props.currentUser.id) ?
            <Link to={`/events/${id}/new`} ><button className="ui primary button">Create Event</button></Link>
            :
            null
          }
        </div>
        <div style={{padding: "1%"}}>
          {
            users.map(user => user.id).includes(this.props.currentUser.id)
            ?
            < button onClick={() => this.props.removeUser(this.props.currentUser.id, id)} className="negative ui button">Leave Group</button>
            :
            null
          }
          {
            this.props.currentUser.name === creator && users.map(user => user.id).includes(this.props.currentUser.id)
            ?
            < button onClick={() => this.props.removeGroup(id)} className="negative ui button">Delete Group</button>
            :
            null
          }
        </div>
      </div>
    )
  }
}
