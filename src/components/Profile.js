import React from 'react'
import GroupContainer from '../containers/GroupContainer'
import EventContainer from '../containers/EventContainer'
class Profile extends React.Component {

  state = {
    events: [],
    groups: [],
    file: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/users/1')
    .then(resp => resp.json())
    .then(user => {
      this.setState({
        events: user.events,
        groups: user.groups
      })
    })
  }

  render() {
    return (
      <div>
        <div class="ui card">
          <a class="image" href="#">
            <img src={this.props.currentUser.image}/>
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
        <h3>Upcoming Event</h3>
        < EventContainer events={this.state.events} searchTerm="" />
      </div>
    )
  }
}


export default Profile
