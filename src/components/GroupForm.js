import React from 'react'

export default class GroupForm extends React.Component {

  state = {
    name: ''
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/groups', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        group: {
          name: this.state.name,
          creator: this.props.currentUser.id
        }
      })
    })
    .then(resp => resp.json())
    .then(newGroup => {
      this.props.addUser(this.props.currentUser, newGroup.id)
      this.props.addGroup(newGroup)
    })
  }

  render() {
    return (
      <div>
        <h3>Create new Group</h3>
        <form onSubmit={this.handleSubmit}>
          <input name='name' value={this.state.value} onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
