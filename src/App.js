import React, { Component } from 'react';
import './App.css';
import Wheel from "./Wheel.js";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tonalCenter: 0,
    };
  }

  setTonalCenter(tonalCenter) {
    this.setState({
      tonalCenter: tonalCenter,
    })
  }

  render() {
    return (
      <div className="App">
        <Wheel setTonalCenter={tc => this.setTonalCenter(tc)}/>
      </div>
    );
  }
}
