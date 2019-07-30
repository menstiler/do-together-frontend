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
        <div class="ui card">
          <a class="image" href="#">
          </a>
          <div class="content">
            <a class="header" href="#">{this.props.currentUser.name}</a>
          </div>
        </div>
        <h3>My Groups</h3>
          < GroupContainer groups={this.state.groups}
           currentUser={this.props.currentUser}
           addUser={this.props.addUser}
           addGroup={this.props.addGroup}
           searchTerm="" />
        <h3>Upcoming Events</h3>
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
