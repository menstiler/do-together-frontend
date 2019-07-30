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
        <Link to="/" ><a className="item ">
        <i className="home icon"></i>
        Home
        </a></Link>

        {
          props.currentUser !== null ?
          <>
          <Link to="/profile" ><a className="item">
            <i className="user icon"></i>
            Profile
          </a></Link>
          <Link to="/group_form" ><a className="item">
            <i className="users icon"></i>
            Create New Group
          </a></Link>
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
        <a className="item right" onClick={props.login}>
          <i className="user icon icon"></i>
          Login
        </a>
      }
      </div>
    </div>
  )
}

export default NavBar
