import React from "react";
import { Link, Route, Switch, Redirect } from 'react-router-dom'

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    messages: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  closeMessage = () => {
    this.setState({
      messages: null
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(response => {
        //set user to state
        //redirect!
        if (response.errors) {
          this.setState({
            messages: response.errors
          })
        } else {
          this.props.setUser(response)
        }
      })
  }

  render() {
    return (
      <>
        {this.state.messages ? (
          <div class="ui error message">
            <i class="close icon" onClick={this.closeMessage}></i>
            <div class="header">{this.state.messages}</div>
          </div>
        ) : null}
        <div className="center-form">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <div class="ui placeholder segment">
              <div class="ui two column very relaxed stackable grid">
                <div class="column">
                  <div class="ui form">
                    <div class="field">
                      <label>Username</label>
                      <div class="ui left icon input">
                        <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                        <i class="user icon"></i>
                      </div>
                    </div>
                    <div class="field">
                      <label>Password</label>
                      <div class="ui left icon input">
                        <input name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="password" />
                        <i class="lock icon"></i>
                      </div>
                    </div>
                    <div>
                      <button className="ui blue submit button login" type="submit">
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
                <div class="middle aligned column">
                  <div class="ui big button">
                    <Link to="/signup" style={{color: "black"}}>
                    <i class="signup icon"></i>
                    Sign Up</Link>
                  </div>
                </div>
              </div>
              <div class="ui vertical divider">Or</div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm
