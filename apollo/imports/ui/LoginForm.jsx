import React, { Component } from "react";

class LoginForm extends Component {
  loginUser = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, (error) => {
      if (error) {
        console.log(error);
      }
      this.props.client.resetStore();
    });
  };
  state = {};
  render() {
    return (
      <form onSubmit={this.loginUser}>
        <input type="email" ref={(input) => (this.email = input)} />
        <input type="password" ref={(input) => (this.password = input)} />
        <button type="submit"> Login User</button>
      </form>
    );
  }
}

export default LoginForm;
