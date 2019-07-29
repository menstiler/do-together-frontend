import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
function NavBar() {
  return (
    <div>
      <Link to="/" ><button>Home</button></Link>
      <Link to="/profile" ><button>Profile</button></Link>
      <button>Logout</button>
      <Link to="/group_form" ><button>Create New Group</button></Link>
    </div>
  )
}

export default NavBar
