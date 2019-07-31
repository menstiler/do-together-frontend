import React from 'react'
import GroupContainer from '../containers/GroupContainer'
import EventContainer from '../containers/EventContainer'
import { Link } from 'react-router-dom'
class Profile extends React.Component {

  state = {
    events: [],
    attendees: [],
    groups: [],
    file: null,
    selectedEvent: null
  }

  selectEvent = (id) => {
    this.setState({
      selectedEvent: id,
    })
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    .then(resp => resp.json())
    .then(user => {
      this.setState({
        events: user.events,
        attendees: user.attendees,
        groups: user.groups,
        selectedEvent: user.attendees.length > 0 ? user.attendees[0].event.id : null
      })
    })
  }

  render() {
    debugger
    return (
      <div id="profile">
        <div className="ui card">
          <div className="content name-card">
            <h3 style={{margin: "0"}}>{this.props.currentUser.name}</h3>
            <img className="ui avatar image icons" src={`/icons/${this.props.currentUser.image}`} alt="" />
          </div>
        </div>
        <h3 className="headers">My Groups</h3>
        {
          this.state.groups.length > 0 ?
          < GroupContainer groups={this.state.groups}
           currentUser={this.props.currentUser}
           addUser={this.props.addUser}
           addGroup={this.props.addGroup}
           searchTerm=""
           />
           :
           <div className="centerItem">
           <Link to="/groups" ><button className="ui primary button">Join a Group</button></Link>
           </div>
         }
        <h3 className="headers">Upcoming Events</h3>
        {
          this.state.attendees.length < 1 ?
          <div className="centerItem">
            You have no upcoming events
          </div>
          :
          < EventContainer events={this.state.events.filter(event => this.state.attendees.map(attendee => attendee.event.id).includes(event.id))}
          searchTerm=""
          selectedEvent={this.state.selectedEvent}
          selectEvent={this.selectEvent}
          />
      }
      </div>
    )
  }
}


export default Profile
