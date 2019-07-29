import React from 'react'


export default class AddUsers extends React.Component {

  state = {
    newUsers: []
  }

  addUser = (id) => {
    let newUser = this.props.users.find(user => user.id === id)
    // debugger
    if (!this.state.newUsers.includes(newUser)) {
      this.setState({
        newUsers: [...this.state.newUsers, newUser]
      })
    } else if (this.state.newUsers.includes(newUser)) {
      let index = this.state.newUsers.indexOf(newUser)
      let updatedUsers = this.state.newUsers.slice(0, index).concat(this.state.newUsers.slice(index + 1))
      this.setState({
        newUsers: updatedUsers
      })
    }
  }

  renderUsers = () => {
    return this.props.users.map(user => {
      return (
        <div onClick={() => this.addUser(user.id)} className={this.state.newUsers.includes(user) ? 'user-border on' : 'user-border off'}>
          <div >{user.name}</div>
        </div>
      )
    })
  }

  handleSubmit = (event, selectedGroup, newUsers) => {
    event.preventDefault()

    this.props.addUsersToGroup(event, selectedGroup, newUsers)
    this.setState({
      newUsers: []
    })
  }

  render() {

    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event, this.props.selectedGroup, this.state.newUsers)}>
          {this.renderUsers()}
          <input type="submit" />
        </form>
      </div>
    )
  }
}
