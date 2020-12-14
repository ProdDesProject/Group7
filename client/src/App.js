import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './ components/Header';
import LogAndReg from './ components/LogAndReg';
import Reservation from './ components/Reservation'
import OwnReservation from './ components/OwnReservation'
import AddReservation from './ components/AddReservation'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkLogAndReg: false,
      isAuthenticated: false,
      username: 'lamhoangpham125',
      password: null,
      activeJWT: null,
      hours: [],
      robots: [],
      user: null,
      resByUsername: null,
    }
  }

  componentDidMount() {
    if (this.state.isAuthenticated == false) {
      let token = localStorage.getItem('token');
      axios.get('http://localhost:4000/login/jwtProtectedResource', {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then(result => {
        this.setState({ user: result.data.user })
        this.setState({ isAuthenticated:true})
      }).catch(error=>console.log(error))
    }

    axios.get("http://localhost:4000/hours").then((result) => {
      this.setState({ hours: result.data })
    })
    axios.get("http://localhost:4000/robots").then((result) => {
      this.setState({ robots: result.data })
    })
    if (this.state.username != null) {
      axios.get("http://localhost:4000/res/res/" + this.state.username).then((result) => {
        this.setState({ resByUsername: result.data })
      })
    }
  }


  onLogin = (user) => {
    this.setState({ isAuthenticated: true })
    this.setState({ user: user });
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  }

  onLogout = () => {
    this.setState({ isAuthenticated: false });
    this.setState({user:null})
    localStorage.removeItem('token')
  }

  onChangeState = () => {
    this.setState({
      checkLogAndReg: !this.state.checkLogAndReg
    })
  }

  updateUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  updatePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  resetForm = () => {
    this.setState({ username: null, password: null })
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
        <Route path="/reservation" exact render={routeProps => <Reservation {...routeProps}
          hours={this.state.hours}
          resByUsername={this.state.resByUsername}
          robots={this.state.robots}
          user={this.state.user} />} />
        <Route path="/reservation/new/robotId/:robotId/date/:date/minId/:minId"
          exact render={routeProps => <AddReservation user={this.state.user}
          isAuthenticated={this.state.isAuthenticated}
            robots={this.state.robots} {...routeProps} />}
        />
        <Route path="/reservation/user"
          exact render={routeProps => <OwnReservation
            resByUsername={this.state.resByUsername}
            isAuthenticated={this.state.isAuthenticated}
            user={this.state.user} {...routeProps} />}
        />
      </Router>
    )
  }
}
