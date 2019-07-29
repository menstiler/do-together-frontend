import React from 'react'

export default class EventCard extends React.Component {

  render() {
    const { name, group, id } = this.props.eventItem
    return (
      <div onClick={() => this.props.handleClick(id)} className="ui card">
        <div className="card">
          <div className="content">
            <i class="right floated lemon outline icon"></i>
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
