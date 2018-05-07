import React, { Component } from 'react';
import './App.css';
import Wheel from "./Wheel.js";
import IntervalSet from "./Utils/IntervalSet";
import Marquee from "./Marquee";
import Scalar from "./Utils/Scalar";
import {musicTheory} from "./Data/musicTheory";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tonalCenter: 0,
      intervalSet: new IntervalSet(0b101010110101), // Major scale
    };
  }

  setTonalCenter(tonalCenter) {
    const tc = Scalar.wrap(tonalCenter, musicTheory.octaveDivisions);
    this.setState({
      tonalCenter: tc,
    })
  }

  shiftIntervalSet(rotation) {
    this.setState({
      intervalSet: this.state.intervalSet.shift(rotation),
    });
  }

  toggleInterval(interval) {
    this.setState({
      intervalSet: this.state.intervalSet.toggleInterval(interval),
    });
  }

  render() {
    return (
      <div className="App">
        <Marquee
          tonalCenter={this.state.tonalCenter}
          intervalSet={this.state.intervalSet}
        />
        <Wheel
          setTonalCenter={tc => this.setTonalCenter(tc)}
          shiftIntervalSet={(r) => this.shiftIntervalSet(r)}
          intervalSet={this.state.intervalSet}
          toggleInterval={interval => this.toggleInterval(interval)}
        />
      </div>
    );
  }
}
