import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
function NavBar() {
  return (
    <div>

      <div class="ui labeled icon menu">
        <div class="header item">
          <i class="lemon outline icon"></i>
          Do Together
        </div>
       <Link to="/" ><a class="item">
          <i class="home icon"></i>
          Home
        </a></Link>
        <Link to="/profile" ><a class="item">
          <i class="user icon"></i>
          Profile
        </a></Link>
        <Link to="/group_form" ><a class="item">Create New Group</a></Link>
        <a class="item right">
          <i class="x icon icon"></i>
          Logout
        </a></Link>
      </div>
    </div>
  )
}

export default NavBar
