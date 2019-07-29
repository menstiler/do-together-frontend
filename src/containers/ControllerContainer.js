import React from 'react'

export default class ControllerContainer extends React.Component {
  render() {
    return (
      <div class="ui buttons">
        <button class="ui button" onClick={this.props.changeToGroupView}>Groups</button>
        <button class="ui button" onClick={this.props.changeToEventView}>Events</button>
      </div>
    )
  }
}
