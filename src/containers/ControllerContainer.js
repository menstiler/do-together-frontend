import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
export default class ControllerContainer extends React.Component {


  render() {
    return (
    <div>
      <div className="ui menu">
        <div className="item">
          <div className="ui icon input">
            <input type="text" value={this.props.searchTerm} onChange={this.props.handleChange} placeholder="Search"/>
            <i className="search icon"></i>
          </div>
        </div>
        <div className="item right">
        <div class="ui buttons">
          <Link to="/groups"><button className="ui button" onClick={this.props.handleChange} value="">Groups</button></Link>
          <div class="or"></div>
          <Link to="/events"><button className="ui button" onClick={this.props.handleChange} value="">Events</button></Link>
        </div>
        </div>
      </div>
    </div>
    )
  }
}
