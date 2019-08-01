import React from "react";
const avators = [
  "003-man-1.svg", "012-man-5.svg", "009-cowboy.svg", "001-woman.svg", "006-man-4.svg", "030-woman-5.svg",
  "014-man-6.svg", "033-boy.svg", "031-student.svg", "010-cowgirl.svg", "029-man-14.svg", "015-gymnast.svg",
  "026-man-11.svg", "021-man-8.svg", "017-hipster-1.svg", "034-girl.svg", "013-woman-2.svg",
  "025-nerd.svg", "005-man-3.svg", "004-man-2.svg", "035-woman-6.svg", "019-man-7.svg"
]

class SignupForm extends React.Component {
  state = {
    displayName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    messages: null,
    image: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleImageChange = (image) => {
    this.setState({
      image: image
    });
  }

  closeMessage = () => {
    this.setState({
      messages: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.password === this.state.passwordConfirmation) {
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: this.state.displayName,
          username: this.state.username,
          password: this.state.password,
          image: this.state.image
        })
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            this.setState({
              messages: response.errors
            });
          } else {
            // send them somewhere
            // storing the user object SOMEWHERE
            this.props.setUser(response);
          }
        });
    } else {
      this.setState({
        messages: "Passwords don't match!"
      });
    }
  };

  render() {
    return (
      <div id="signup">
        <h2 style={{paddingBottom: "5%"}}>Create New Account</h2>
        {this.state.messages ? (
          <div class="ui error message">
            <i class="close icon" onClick={this.closeMessage}></i>
            <div class="header">{this.state.messages}</div>
          </div>
        ) : null}
        <div className="center-form">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <div class="ui form">
              <div class="two fields">
                <div class="field">
                  <label>Username</label>
                  <input
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="username"
                  />
                </div>
                <div class="field">
                  <label>Display Name</label>
                  <input
                    name="displayName"
                    value={this.state.displayName}
                    onChange={this.handleChange}
                    placeholder="display name"
                  />
                </div>
              </div>
              <div class="two fields">
                <div class="field">
                  <label>Password</label>
                  <input
                    name="password"
                    value={this.state.password}
                    type="password"
                    onChange={this.handleChange}
                    placeholder="password"
                  />
                </div>
                <div class="field">
                  <label>Confirm Password</label>
                  <input
                    name="passwordConfirmation"
                    value={this.state.passwordConfirmation}
                    type="password"
                    onChange={this.handleChange}
                    placeholder="password confirmation"
                  />
                </div>

              </div>

              <div class="field">
                <label>Choose Icon</label>
                <div class="ui four cards">
                {
                  avators.map(avator => {
                    return (
                      <a class={this.state.image === avator ? "red card on" : "red card"} name="image" onClick={() => this.handleImageChange(avator)}>
                        <div class="image">
                          <img src={`/icons/${avator}`}/>
                        </div>
                      </a>
                    )
                  })
                }
                </div>
              </div>
            </div>
            <button className="ui primary button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;
