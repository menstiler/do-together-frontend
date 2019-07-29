import React from 'react'

export default class GroupCard extends React.Component {
  render() {
    const { name, users, id, creator } = this.props.group

    return (
      <div onClick={() => this.props.changeSelectedGroup(id)}>
        <h3></h3>
        <p></p>
        <div className="ui card">
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
        </div>
      </div>
    )
  }
}
