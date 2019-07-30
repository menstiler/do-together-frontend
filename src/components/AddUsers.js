import React from 'react'


export default class AddUsers extends React.Component {

  state = {
    newUsers: []
  }

  addUser = (id) => {
    let newUser = this.props.users.find(user => user.id === id)
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
        <div onClick={() => this.addUser(user.id)} className={this.state.newUsers.includes(user) ? 'user-border on card' : 'user-border off card'}>
            <div className="content">
              <img className="right floated mini ui image" src={user.image} />
            <div className="header">
              {user.name}
            </div>
            </div>
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
      <div id="add-users">
        <h2>Add Members</h2>
        <form onSubmit={(event) => this.handleSubmit(event, this.props.selectedGroup, this.state.newUsers)}>
          <div className="ui cards">
          {this.renderUsers()}
          </div>
          <div style={{paddingTop: "1%"}}>
            <input type="submit" value="Add Members" className="ui primary button" />
          </div>
        </form>
      </div>
    )
  }
}
