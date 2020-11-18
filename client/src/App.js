import React, { Component } from 'react';
import Header from './ components/Header';
import LogAndReg from './ components/LogAndReg'

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
      <div>
        <LogAndReg onChangeState={this.onChangeState} checkLogAndReg={this.state.checkLogAndReg} />
      </div>
    )
  }
}