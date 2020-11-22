import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './ components/Header';
import LogAndReg from './ components/LogAndReg';
import Reservation from './ components/Reservation'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkLogAndReg: false
    }
  }

  onChangeState = (e) => {
    e.preventDefault();
    this.setState({
      checkLogAndReg: !this.state.checkLogAndReg
    })
  }

  render() {
    console.log(this.state.checkLogAndReg)
    return (
      <Router>
        <Route path="/" exact render={routeProps => <Header {...routeProps} />} />
        <Route path="/login" exact render={routeProps =>
          <LogAndReg {...routeProps}
            onChangeState={this.onChangeState}
            checkLogAndReg={this.state.checkLogAndReg}
          />} />
        <Route path="/reservation" exact render={routeProps => <Reservation {...routeProps} />} />
      </Router>
    )
  }
}