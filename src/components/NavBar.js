import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
function NavBar() {
  return (
    <div>
      <div className="ui labeled icon menu" style={{backgroundColor: "#fff8a6"}}>
        <div className="header item">
          <i className="lemon outline icon"></i>
          Do Together
        </div>
       <Link to="/" ><a className="item">
          <i className="home icon"></i>
          Home
        </a></Link>
        <Link to="/profile" ><a className="item">
          <i className="user icon"></i>
          Profile
        </a></Link>
        <Link to="/group_form" ><a className="item">
          <i className="users icon"></i>
          Create New Group
        </a></Link>
        <a className="item right">
          <i className="x icon icon"></i>
          Logout
        </a>
      </div>
    </div>
  )
}

export default NavBar
