import React from 'react'

export default class GroupCard extends React.Component {
  render() {
    const { name, users } = this.props.group

    return (
      <div>
        <h3>{name}</h3>
        <p>{users.length} members</p>
      </div>
    )
  }
}
