import React from "react";
import { Link } from 'react-router-dom'

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

  renderLemon = () => {
    return (
      <i className="lemon icon landing"></i>
    )
  }

  render() {
    return (
      <div style={{padding: "1%"}}>
        {this.renderLemon()}
        <h2>Login</h2>
        {this.state.messages ? (
          <div class="ui error message">
            <i class="close icon" onClick={this.closeMessage}></i>
            <div class="header">{this.state.messages}</div>
          </div>
        ) : null}
        <div className="center-form">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <div className="ui placeholder segment">
              <div className="ui two column very relaxed stackable grid">
                <div className="column">
                  <div className="ui form">
                    <div className="field">
                      <label>Username</label>
                      <div className="ui left icon input">
                        <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                        <i className="user icon"></i>
                      </div>
                    </div>
                    <div className="field">
                      <label>Password</label>
                      <div className="ui left icon input">
                        <input name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="password" />
                        <i className="lock icon"></i>
                      </div>
                    </div>
                    <div>
                      <button className="ui blue submit button login" type="submit">
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
                <div className="middle aligned column">
                <Link to="/signup" style={{color: "black"}}>
                  <div className="ui big button">
                    <i className="signup icon"></i>
                    Sign Up
                  </div>
                  </Link>
                </div>
              </div>
              <div className="ui vertical divider">Or</div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
