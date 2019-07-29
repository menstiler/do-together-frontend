import React from 'react'

export default class EventShow extends React.Component {
  render() {

    const { name, group, time, activity } = this.props.selectedEvent

    return (
      <div>
        {this.props.parent === 'groupShow' ? null : <h3>{name}</h3>}
        {this.props.parent === 'groupShow' ? null : <h4>{group.name}</h4>}
        <p>{time}</p>
        <p>{activity.title}</p>
        <p>{activity.location}</p>
      </div>
    )
  }
}
