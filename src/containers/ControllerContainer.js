import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
export default class ControllerContainer extends React.Component {


  render() {
    return (
      <div>
      <label>Search: </label>
      <input type="text" value={this.props.searchTerm} onChange={this.props.handleChange}/>
      <div class="ui buttons">
        <Link to="/groups"><button class="ui button" onClick={this.props.handleChange} value="">Groups</button></Link>
        <Link to="/events"><button class="ui button" onClick={this.props.handleChange} value="">Events</button></Link>
      </div>
      </div>
    )
  }
}
