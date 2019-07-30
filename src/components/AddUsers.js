import React from 'react'


export default class AddUsers extends React.Component {

  state = {
    users: this.props.users,
    newUsers: [],
    filteredUsers: this.props.users,
  }

  handleChange = (event) => {
    this.setState({
      filteredUsers: this.state.users.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase()))
    })
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
    return this.state.filteredUsers.map(user => {
      return (
        <div onClick={() => this.addUser(user.id)} className={this.state.newUsers.includes(user) ? 'user-border on card' : 'user-border off card'}>
            <div className="content">
              <img className="ui avatar image right floated" src={`/icons/${user.image}`} alt="" />
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
        <div class="ui icon input">
          <input value={this.state.search} onChange={this.handleChange} placeholder="Search" />
          <i class="search icon"></i>
        </div>
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
