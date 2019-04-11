import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const fieldName = event.target.name,
          fieldValue = event.target.value;
    this.setState({ [fieldName] : fieldValue });
    // console.log(this.state);
  }

  logInUser = event => {
    event.preventDefault();
    const username = this.state.username,
          password = this.state.password;
    axios
      .post("http://localhost:5000/logins",{
        username: username,
        password: password
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <h1>Please login.</h1>
        <form>
          <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
          <input type="submit" value="Login" onClick={this.logInUser}/>
        </form>
      </div>
    );
  }
}

export default App;
