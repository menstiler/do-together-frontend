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
          creator: this.props.currentUser.name
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
      <div id="create-group">
        <h3>Create new Group</h3>
        <form onSubmit={this.handleSubmit} className="ui form">
          <div className="field">
            <input name='name' value={this.state.value} placeholder="Name" onChange={this.handleChange} />
          </div>
          <input className="ui primary button" type="submit" />
        </form>
      </div>
    )
  }
}
