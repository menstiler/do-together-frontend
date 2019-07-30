import React from 'react'

export default class EventCard extends React.Component {

  render() {
    const { name, group, id, activity } = this.props.eventItem
    return (
      <div onClick={() => this.props.handleClick(id)} className="ui card" id="event-card">
        <div className="card">
          <div className="content">
            <i className={`right floated ${activity.icon} icon`}></i>
          <div className="header">
            {name}
          </div>
          <div className="meta">
            {this.props.selectedGroup === null ? group.name : null}
          </div>
          <div className="description">
            Event Description...
          </div>
        </div>
      </div>
    </div>
    )
  }
}
