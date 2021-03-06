import React from 'react'


export default class EventShow extends React.Component {

  renderButtons = (id, group, attendees) => {
    if (this.props.parent === 'groupShow' && this.props.currentUser !== null) {
      if (this.props.group.users.map(user => user.id).includes(this.props.currentUser.id) && !attendees.map(user => user.user_id).includes(this.props.currentUser.id)) {
        return (
          <div class="extra content">
            <button class="ui button" onClick={() => this.props.newAttendee(id, this.props.currentUser, group.id)}>RSVP</button>
          </div>
        )
      } else if (!this.props.group.users.map(user => user.id).includes(this.props.currentUser.id)) {
        return null
      } else {
        return (
          <div class="extra content">
            <button class="ui button" onClick={() => this.cancelAttendee(id, this.props.currentUser, group.id)}>Cancel RSVP</button>
          </div>
        )
      }
    } else if (this.props.currentUser !== null && this.props.parent === 'profile') {
      return (
        <div class="extra content">
          <button class="ui button" onClick={() => this.cancelAttendee(id, this.props.currentUser, group.id)}>Cancel RSVP</button>
        </div>
      )
    }
  }

  cancelAttendee = (event_id, user, group_id) => {
    let foundAttendee = this.props.selectedEvent.attendees.find(attendee => attendee.user_id === user.id && attendee.event_id ===  event_id)
    this.props.cancelAttendee(event_id, foundAttendee, group_id)
    if (this.props.parent === 'profile') {
      this.props.changeState(foundAttendee.id)
    }
  }

  render() {
    const { name, group, time, activity, creator, id, attendees } = this.props.selectedEvent
    return (
      <div id="event-details">
        <div className="ui card">
          <div class="content">
            <h3>{name}</h3>
            <div class="meta">
              <span class="category">{this.props.parent === 'groupShow' ? null : <h4>{group.name}</h4>}</span>
            </div>
            <div class="description">
              <p>Created By {creator}</p>
              <p>{time.split("-").join(" ").split("T").join(" ")}</p>
              <p>{activity.title}</p>
              <p>{activity.location}</p>
            </div>
            <div>
            { attendees.length > 0 && this.props.parent === 'groupShow'
              ?
              <h3>Attendees</h3>
              :
              null
            }
              {
                this.props.parent === 'groupShow' ?
                this.props.group.users.filter(user => attendees.map(attendee => attendee.user_id).includes(user.id)).map(user => {
                  return (
                      <div className="ui card">
                      <div className="content name-card">
                        <h3 style={{margin: "0"}}>{user.name}</h3>
                        <img className="ui avatar image icons" src={`/icons/${user.image}`} alt="" />
                      </div>
                    </div>
                )})
                :
                null
              }
            </div>
          </div>
          {
            this.renderButtons(id, group, attendees)
          }
          {
            this.props.parent === 'groupShow'
            && this.props.currentUser !== null
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
