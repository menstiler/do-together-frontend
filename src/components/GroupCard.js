import React from 'react'
import { Link } from 'react-router-dom'

export default class GroupCard extends React.Component {

  render() {
    const { name, users, id, creator } = this.props.group

    return (
        <Link to={`/groups/${id}`} className="card" >
          <div className="content">
            <a className="header">{name}</a>
            <div className="meta">
              <span className="date">Created By {creator}</span>
            </div>
            <div className="description">
              Group Description...
            </div>
          </div>
          <div className="extra content">
            <a>
            <i className="user icon"></i>
            {users.length} members
            </a>
          </div>
        </Link>
    )
  }
}
