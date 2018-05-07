import React, { Component } from 'react';
import './App.css';
import Wheel from "./Wheel.js";
import IntervalSet from "./Utils/IntervalSet";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tonalCenter: 0,
      intervalSet: new IntervalSet(0b101010110101), // Major scale
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
        <Wheel
          setTonalCenter={tc => this.setTonalCenter(tc)}
          intervalSet={this.state.intervalSet}
        />
      </div>
    );
  }
}
