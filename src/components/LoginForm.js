import React from 'react'

class LoginForm extends React.Component {

  state = {
    username: "",
    password: "",
    messages: null
  }

  handleChange = (event) => {
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
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(response => {
      //set user to state
      //redirect!
      if (response.errors){
        this.setState({
          messages: response.errors
        })
      } else {
        this.props.setUser(response)
      }
    })

  }

  render(){
    return (
      <>
      { this.state.messages ?
        <div class="ui warning message">
          <i class="close icon" onClick={this.closeMessage}></i>
          <div class="header">
            {this.state.messages}
          </div>
        </div>
      :
      null
      }
      <div className="center-form">
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <input name="username" value={this.state.username} onChange={this.handleChange}placeholder="username"/>
          <input name="password" value={this.state.password} type="password"  onChange={this.handleChange}placeholder="password"/>
          <button className="login" type="submit">Log In</button>
        </form>
      </div>
      </>
    )
  }

}

export default LoginForm
