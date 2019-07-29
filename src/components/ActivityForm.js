import React from 'react'

export default class ActivityForm extends React.Component {
  state = {
    title: '',
    location: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { title, location } = this.state

    return (
      <form onSubmit={(event) => this.props.addNewActivity(event, title, location, this.props.group_id)}>
        <h4>Add New Activity</h4>
        <label>
          Title:
          <input type="text" name="title" value={title} onChange={this.handleChange} placeholder="Title" />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={location} onChange={this.handleChange} placeholder="Location" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
