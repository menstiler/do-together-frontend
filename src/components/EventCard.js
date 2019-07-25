import React from 'react'

export default class EventCard extends React.Component {
  // componentDidUpdate() {
  //   if (this.props.parent === 'eventList' && this.state.parent !== 'eventList') {
  //     this.setState({
  //       parent: 'groupShow'
  //     })
  //   } else {
  //     this.setState({
  //       parent: 'eventList'
  //     })
  //   }
  // }

  render() {
    const { name, group, id } = this.props.eventItem

    return (
      <div onClick={() => this.props.handleClick(id)}>
        <h3>{name}</h3>
        <p>{this.props.selectedGroup === null ? group.name : null}</p>
      </div>
    )
  }
}
