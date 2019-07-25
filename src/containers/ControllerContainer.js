import React from 'react'

export default class ControllerContainer extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.changeToGroupView}>Groups</button>
        <button onClick={this.props.changeToEventView}>Events</button>
      </div>
    )
  }
}
