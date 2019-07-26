import React from 'react'

export default class EventForm extends React.Component {
  state = {
    activities: [],
    name: '',
    time: '',
    group_id: this.props.group_id,
    activity_id: 0,
    img_url: '',
    checked: false,
    showActivityForm: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/activities')
    .then(res => res.json())
    .then(activities => {
      this.setState({ activities })
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3000/events', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        time: this.state.time,
        group_id: this.state.group_id,
        activity_id: this.state.activity_id
      })
    })
    .then(res => res.json())
    .then(newEvent => {
      this.props.groups.map(group => group.events)
    })
  }

  render() {
    const { activities, name, time, group_id, activity_id, img_url } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Name" />
        </label>
        <label>
          Date:
          <input type="datetime-local" name="time" value={time} onChange={this.handleChange} placeholder="Date" />
        </label>
        <div>
          <label>
            Activity:
            <select value={activity_id} name="activity_id" onChange={this.handleChange} >
              <option value="0">Select An Activity</option>
              {activities.map(activity => {
                return <option value={activity.id}>{activity.title}</option>
              })}
            </select>
          </label>
          <button>+</button>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
