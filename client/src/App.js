import React, { Component } from 'react';
import './App.css';
import request from 'superagent';
import axios from 'axios';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// import Login from './Login';
// import Dashboard from './Dashboard';

const fakeAuthCentralState = {
   isAuthenticated: false
};

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const fieldName = event.target.name,
          fieldValue = event.target.value;
    this.setState({ [fieldName] : fieldValue });
    // console.log(this.state);
  }

  logInUserAxios = event => {
    event.preventDefault();
    const username = this.state.username,
          password = this.state.password;
    axios
      .post("/logins", {
        username: username,
        password: password
      })
      .then(res => {
        // console.log(res);
          fakeAuthCentralState.isAuthenticated = true;
          this.props.history.push("/Dashboard");
      })
      .catch(err => this.setState({ errorMessage: err.response.data.payload.message, password: "" }))
  }

  logInUserSuperAgent = event => {
    event.preventDefault();
    const username = this.state.username,
          password = this.state.password;
    request
      .post("/logins", {
        username: username,
        password: password
      })
      .then(res => {
        // console.log(res);
          fakeAuthCentralState.isAuthenticated = true;
          this.props.history.push("/Dashboard");
      })
      .catch(err => this.setState({ errorMessage: err.response.data.payload.message, password: "" }))
  }

  logInUserFetch = event => {
    event.preventDefault();
    const username = this.state.username,
          password = this.state.password,
          userLogin = {
            username: username,
            password: password
          }
    fetch("/logins", {
      method: 'post',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    })
    .then(res => {
      // console.log(res);
        fakeAuthCentralState.isAuthenticated = true;
        this.props.history.push("/Dashboard");
    })
      .catch(err => this.setState({ errorMessage: err.response.data.payload.message, password: "" }))
  }

  navToDashboard = () => this.props.history.push("/Dashboard");

  render() {
    return (
      <div className="App">
        <h1>Please login.</h1>
        <div>{ this.state.errorMessage }</div>
        <p>Username: john.doe, Password: Qwerty</p>
        <button onClick={this.navToDashboard}>Dashboard (This won't work unless you're logged in)</button>
        <form>
          <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
          <input type="submit" value="Login via Axios" onClick={this.logInUserAxios}/>
          <input type="submit" value="Login via Super Agent" onClick={this.logInUserSuperAgent}/>
          <input type="submit" value="Login via Fetch" onClick={this.logInUserFetch}/>
        </form>
      </div>
    );
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    // console.log(fakeAuthCentralState);
    if(!fakeAuthCentralState.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  navToLogin = () => this.props.history.push("/");

  logout = () => {
    fakeAuthCentralState.isAuthenticated = false;
    this.props.history.push("/");
  }

  render() {
      return (
        <div className="container">
        <h1> Hello </h1>
        <button onClick={this.navToLogin}>Login Page</button>
        <button onClick={this.logout}>Log out</button>
        </div>
      )
  }
}

class App extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component = { Login } />
          <Route exact path="/Dashboard" component = { Dashboard } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
