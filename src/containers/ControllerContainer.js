import React from 'react'
import { Link } from 'react-router-dom'
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
        <div className="ui buttons">
          <Link to="/groups"><button className="ui button" onClick={this.props.handleChange} value="" style={{backgroundColor: "#b0deff"}}>Groups</button></Link>
          <div className="or"></div>
          <Link to="/events"><button className="ui button" onClick={this.props.handleChange} value="" style={{backgroundColor: "#b0deff"}}>Events</button></Link>
        </div>
        </div>
      </div>
    </div>
    )
  }
}
