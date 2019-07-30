import React from 'react'
import GroupContainer from '../containers/GroupContainer'
import EventContainer from '../containers/EventContainer'
class Profile extends React.Component {

  state = {
    events: [],
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
    fetch('http://localhost:3000/users/1')
    .then(resp => resp.json())
    .then(user => {
      this.setState({
        events: user.events,
        groups: user.groups,
        selectedEvent: user.events[0].id
      })
    })
  }

  render() {
    return (
      <div id="profile">
        <div className="ui card">
          <div className="content name-card">
            <h3 style={{margin: "0"}}>{this.props.currentUser.name}</h3>
            <img className="ui avatar image icons" src={`/icons/${this.props.currentUser.image}`} alt="" />
          </div>
        </div>
        <h3 className="headers">My Groups</h3>
          < GroupContainer groups={this.state.groups}
           currentUser={this.props.currentUser}
           addUser={this.props.addUser}
           addGroup={this.props.addGroup}
           searchTerm="" />
        <h3 className="headers">Upcoming Events</h3>
        {this.state.events.length > 0 ?
        < EventContainer events={this.state.events}
        searchTerm=""
        selectedEvent={this.state.selectedEvent}
        selectEvent={this.selectEvent}/>
        :
        null }
      </div>
    )
  }
}


export default Profile
