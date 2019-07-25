import React from 'react'
import GroupCard from '../components/GroupCard'

export default class GroupContainer extends React.Component {
  renderGroupCards = () => {
    return this.props.groups.map(group => {
      return < GroupCard key={group.id} group={group} />
    })
  }

  render() {
    return (
      <div>
        {this.renderGroupCards()}
      </div>
    )
  }
}
