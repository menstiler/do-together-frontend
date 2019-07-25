import React from 'react'

export default class EventCard extends React.Component {
  render() {
    const { name, group, id } = this.props.eventItem

    return (
      <div onClick={() => this.props.handleClick(id)}>
        <h3>{name}</h3>
        <p>{group.name}</p>
      </div>
    )
  }
}
