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
      <div style={{paddingTop: "1%"}}>
        <form onSubmit={(event) => this.props.addNewActivity(event, title, location, this.props.group_id)}>
          <h2>Add New Activity</h2>
          <h3>Title:</h3>
          <div className="ui input">
            <input type="text" name="title" value={title} onChange={this.handleChange} placeholder="Title" />
          </div>
          <h3>Location:</h3>
          <div className="ui input">
            <input type="text" name="location" value={location} onChange={this.handleChange} placeholder="Location" />
          </div>
          <div style={{paddingTop: "1%"}}>
            <input type="submit" value="Submit" className="ui primary button" />
          </div>
        </form>
      </div>
    )
  }
}
