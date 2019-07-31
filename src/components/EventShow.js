import React from 'react'


export default class EventShow extends React.Component {

  state = {
    longLat: null
  }

  findLongLat = () => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=Feo2M1EQmW7gee0uAICMA44ahRGGGOF6&inFormat=kvp&outFormat=json&location=${this.props.selectedEvent.activity.location}%2C+CO&thumbMaps=false`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        longLat: json.results[0].locations[0].displayLatLng
      }, () => console.log(this.state.longLat))
    })
  }

  cancelAttendee = (event_id, user, group_id) => {
    debugger
    let foundAttendee = this.props.selectedEvent.attendees.find(attendee => attendee.user_id === user.id && attendee.event_id ===  event_id)
    this.props.cancelAttendee(event_id, foundAttendee, group_id)
  }

  render() {
    const { name, group, time, activity, creator, id, attendees } = this.props.selectedEvent
    return (
      <div id="event-details">
        <div className="ui card">
          <div class="content">
          <img src={`/images/${activity.image}.jpeg`} />
            <div class="header">{this.props.parent === 'groupShow' ? null : <h3>{name}</h3>}</div>
            <div class="meta">
              <span class="category">{this.props.parent === 'groupShow' ? null : <h4>{group.name}</h4>}</span>
            </div>
            <div class="description">
              <p>Created By {creator}</p>
              <p>{time.split("-").join(" ").split("T").join(" ")}</p>
              <p>{activity.title}</p>
              <p>{activity.location}</p>
            </div>
          </div>
          {
            this.props.parent === 'groupShow'
            &&
            this.props.currentUser !== null
            &&
            this.props.group.users.map(user => user.id).includes(this.props.currentUser.id)
            &&
            !attendees.map(user => user.user_id).includes(this.props.currentUser.id)
            ?
            <div class="extra content">
              <button class="ui button" onClick={() => this.props.newAttendee(id, this.props.currentUser, group.id)}>RSVP</button>
            </div>
            :
            null
          }
          {
            this.props.parent === 'groupShow'
            &&
            this.props.currentUser !== null
            &&
            attendees.map(user => user.user_id).includes(this.props.currentUser.id)
            ?
            <div class="extra content">
              <button class="ui button" onClick={() => this.cancelAttendee(id, this.props.currentUser, group.id)}>Cancel RSVP</button>
            </div>
            :
            null
          }
          {
            this.props.parent === 'groupShow'
            && this.props.group.users.map(user => user.id).includes(this.props.currentUser.id)
            && this.props.currentUser.name === creator
            ?
            <div class="ui bottom attached button" onClick={(event) => this.props.removeEvent(event, id, group.id)}>
              <i class="close icon"></i>
              Delete Event
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}
