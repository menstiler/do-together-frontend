import React from 'react'
import ActivityForm from './ActivityForm'

export default class EventForm extends React.Component {
  state = {
    name: '',
    time: '',
    group_id: this.props.group_id,
    activity_id: 0,
    img_url: '',
    checked: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { name, time, group_id, activity_id, img_url } = this.state

    return (
      <div>
        <form onSubmit={(event) => this.props.addNewEvent(event, name, time, group_id, activity_id, img_url)}>
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
                {this.props.activities.map(activity => {
                  return <option value={activity.id}>{activity.title}</option>
                })}
              </select>
            </label>
            <button onClick={this.props.addNewActivityForm}>+</button>
          </div>
          <input type="submit" value="Submit"/>
        </form>
        {this.props.showActivityForm ? < ActivityForm hideActivityForm={this.props.hideActivityForm} addNewActivity={this.props.addNewActivity} group_id={group_id} /> : null}
      </div>
    )
  }
}
