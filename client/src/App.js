import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './ components/Header';
import LogAndReg from './ components/LogAndReg';
import Reservation from './ components/Reservation'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkLogAndReg: false,
      isAuthenticated: false,
      username: null,
      password: null,
      activeJWT: null,
    }
  }

  onLogin = () => {
    this.setState({ isAuthenticated: true })
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  }

  onLogout = () => {
    this.setState({ isAuthenticated: false });
  }

  onChangeState = () => {
    this.setState({
      checkLogAndReg: !this.state.checkLogAndReg
    })
  }

  updateUsername = (event) => {
    this.setState({username: event.target.value})
}

  updatePassword = (event) => {
    this.setState({password: event.target.value})
  }

  resetForm = () => {
    this.setState({username: null, password: null})
  }

  render() {
    return (
      <Router>
        <Route path="/" exact render={routeProps => <Header {...routeProps} 
            isAuthenticated={this.state.isAuthenticated}
            onLogout={this.onLogout}
          />} />
        <Route path="/login" exact render={routeProps =>
          <LogAndReg {...routeProps}
            onChangeState={this.onChangeState}
            checkLogAndReg={this.state.checkLogAndReg}
            username={this.state.username}
            password={this.state.password}
            updateUsername={this.updateUsername}
            updatePassword={this.updatePassword}
            resetForm={this.resetForm}
            onLogin={this.onLogin}
            onLoginFail={this.onLoginFail}
            redirectPathOnSuccess="/"
          />} />
        <Route path="/reservation" exact render={routeProps => <Reservation {...routeProps} />} />
      </Router>
    )
  }
}