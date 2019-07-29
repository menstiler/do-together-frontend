import React from 'react'
import GroupCard from '../components/GroupCard'
import { Link } from 'react-router-dom'

export default class GroupContainer extends React.Component {
  renderGroupCards = () => {
    return this.props.groups.filter(group => group.name.toLowerCase().includes(this.props.searchTerm.toLowerCase())).map(group => {
      return < GroupCard key={group.id} group={group} changeSelectedGroup={this.props.changeSelectedGroup} />
    })
  }

  render() {
    return (
      <div className="group-container">
        {this.renderGroupCards()}
      </div>
    )
  }
}
