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

  selectActivity = (activity_id) => {
    this.setState({
      activity_id: activity_id
    })
  }

  renderActivities = () => {
    return this.props.activities.map(activity => {
      return (
        <div onClick={() => this.selectActivity(activity.id)} className={this.state.activity_id === activity.id ? 'user-border on' : 'user-border off'}>
          <div>{activity.title}</div>
        </div>
      )
    })
  }

  renderRestOfForm = () => {
    return (
      <React.Fragment>
      <label>
        Event Name:
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
      </label>
      <label>
        Date:
        <input type="datetime-local" name="time" value={this.state.time} onChange={this.handleChange} placeholder="Date" />
      </label>
      </React.Fragment>
    )
  }

  render() {
    const { name, time, group_id, activity_id, img_url } = this.state
    return (
      <div>
        <form onSubmit={(event) => this.props.addNewEvent(event, name, time, group_id, activity_id, img_url)}>
          {this.renderActivities()}
          {this.state.activity_id !== 0 ? this.renderRestOfForm() : null}
          <div>
            <button onClick={this.props.addNewActivityForm}>+</button>
          </div>
          <input className="ui primary button" type="submit" value="Submit"/>
        </form>
        {this.props.showActivityForm ? < ActivityForm hideActivityForm={this.props.hideActivityForm} addNewActivity={this.props.addNewActivity} group_id={group_id} /> : null}
      </div>
    )
  }
}
