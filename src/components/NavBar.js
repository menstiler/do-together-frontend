import React from 'react'

function NavBar() {
  return (
    <div>
      <div class="ui labeled icon menu">
        <div class="header item">
          <i class="lemon outline icon"></i>
          Do Together
        </div>
        <a class="item">
          <i class="home icon"></i>
          Home
        </a>
        <a class="item">
          <i class="user icon"></i>
          Profile
        </a>
        <a class="item right">
          <i class="x icon icon"></i>
          Logout
        </a>
      </div>
    </div>
  )
}

export default NavBar
