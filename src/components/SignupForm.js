import React from 'react'

class SignupForm extends React.Component {

  state = {
    displayName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
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

    if (this.state.password === this.state.passwordConfirmation){
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: this.state.displayName,
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(res => res.json())
      .then(response => {
        if(response.errors){
          this.setState({
            messages: response.errors
          })
        } else {
          // send them somewhere
          // storing the user object SOMEWHERE
          this.props.setUser(response)
        }
      })
    } else {
      alert("Passwords don't match!")
    }

  }

  render(){
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
            <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="username"/>
            <input name="displayName" value={this.state.displayName} onChange={this.handleChange} placeholder="display name"/>
            <input name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="password"/>
            <input name="passwordConfirmation" value={this.state.passwordConfirmation} type="password" onChange={this.handleChange} placeholder="password confirmation"/>
            <button className="login" type="submit">Sign Up</button>
          </form>
        </div>
      </>
    )
  }

}

export default SignupForm
