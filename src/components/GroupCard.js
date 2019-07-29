import React from 'react'
import { Link } from 'react-router-dom'

export default class GroupCard extends React.Component {
  render() {
    const { name, users, id } = this.props.group

    return (
      <Link to={`/groups/${id}`} ><div>
        <h3>{name}</h3>
        <p>{users.length} members</p>
      </div>
      </Link>
    )
  }
}
