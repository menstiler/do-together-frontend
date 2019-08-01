import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

function NavBar(props) {

  return (
    <div>
      <div className="ui labeled icon menu" style={{backgroundColor: "#fff8a6"}}>
        <div className="header item">
          <i className="lemon outline icon"></i>
          Do Together
        </div>
        <Link to="/" className="item" >
        <i className="home icon"></i>
        Home</Link>

        {
          props.currentUser !== null ?
          <>
          <Link to="/profile" className="item" >
            <i className="user icon"></i>
            Profile
          </Link>
          <Link to="/group_form" className="item">
            <i className="users icon"></i>
            Create New Group
          </Link>
          </>
        :
        null
        }

        {
          props.currentUser !== null ?
        <a className="item right" onClick={props.logout}>
          <i className="x icon icon"></i>
          Logout
        </a>
        :
        <div className="menu right">
          <a className="item" onClick={props.login}>
            <i className="user icon icon"></i>
            Login
          </a>
          <a className="item" onClick={props.signup}>
            <i className="child icon icon"></i>
            Signup
          </a>
        </div>
      }
      </div>
    </div>
  )
}

export default NavBar
