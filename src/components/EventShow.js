import React from 'react'

export default class EventShow extends React.Component {
  render() {
    const { name, group, time, activity, creator } = this.props.selectedEvent

    return (
      <div id="event-details">
        <div>
          <div class="content">
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
          <div class="extra content">
          <div class="right floated author">
            <img class="ui avatar image" src="/images/avatar/small/matt.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    )
  }
}
