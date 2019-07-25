import React from 'react'

export default class GroupCard extends React.Component {
  render() {
    const { name, users, id } = this.props.group

    return (
      <div onClick={() => this.props.changeSelectedGroup(id)}>
        <h3>{name}</h3>
        <p>{users.length} members</p>
      </div>
    )
  }
}
