import React from 'react'
import ActivityForm from './ActivityForm'

export default class EventForm extends React.Component {
  state = {
    name: '',
    time: '',
    group_id: this.props.group_id,
    activity_id: 0,
    img_url: '',
    checked: false,
    showActivityForm: false
  }

  addNewActivityForm = (event) => {
    // debugger
    event.preventDefault()
    this.setState({
      showActivityForm: true
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  selectActivity = (activity_id) => {
    if (activity_id !== this.state.activity_id) {
      this.setState({
        activity_id: activity_id,
        showActivityForm: false
      })
    } else {
      this.setState({
        activity_id: 0
      })
    }
  }

  hideActivityForm = (event) => {
    // event.preventDefault()
    this.setState({
      showActivityForm: false
    })
  }

  renderActivities = () => {
    return this.props.activities.map(activity => {
      return (
        <div onClick={() => this.selectActivity(activity.id)} className={this.state.activity_id === activity.id ? 'user-border on card' : 'user-border off card'}>
            <div className="content">
              <i className="right floated lemon outline icon"></i>
            <div className="header">
              {activity.title}
            </div>
            </div>
        </div>
      )
    })
  }

  renderRestOfForm = () => {
    return (
      <React.Fragment>
        <h3>Event Name:</h3>
        <div className="ui input">
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
        </div>
        <h3>Date:</h3>
        <div className="ui input">
          <input type="datetime-local" name="time" value={this.state.time} onChange={this.handleChange} placeholder="Date" />
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { name, time, group_id, activity_id, img_url } = this.state
    return (
      <div id="new-event">
        <h2>Create New Event</h2>
        <form onSubmit={(event) => this.props.addNewEvent(event, name, time, group_id, activity_id, img_url)}>
          <h3>Activities:</h3>
          <div className="ui cards">
            {this.renderActivities()}
          </div>
          {this.state.activity_id !== 0 ? this.renderRestOfForm() : null}
          <div style={{paddingTop: "1%"}}>
            {this.state.showActivityForm || (this.state.activity_id > 0) ? null : <button className="ui button" onClick={this.addNewActivityForm}>Create New Activity</button> }
          </div>
          <div style={{paddingTop: "1%"}}>
            {this.state.showActivityForm ? null : <input className="ui primary button" type="submit" value="Submit"/> }
          </div>
        </form>
        {this.state.showActivityForm ? < ActivityForm hideActivityForm={this.hideActivityForm} addNewActivity={this.props.addNewActivity} group_id={group_id} /> : null}
      </div>
    )
  }
}
