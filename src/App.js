import React, { Component } from 'react';
import './App.css';
import Wheel from "./Wheel.js";
import IntervalSet from "./Utils/IntervalSet";
import Marquee from "./Marquee";
import Scalar from "./Utils/Scalar";
import {musicTheory} from "./Data/musicTheory";
import NoteSet from "./Utils/NoteSet";
import IntervalSetFactory from "./Utils/IntervalSetFactory";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tonalCenter: 0,
      intervalSet: IntervalSetFactory.fromBinary(0b101010110101),
    };
  }

  /**
   * Calculate the current notes based on the intervals and rotation.
   *
   * @return {NoteSet}
   */
  noteSet() {
    return NoteSet.fromIntervalSet(
      this.state.intervalSet,
      -this.state.tonalCenter
    ).namedIfFeasible;
  }

  setTonalCenter(tonalCenter) {
    const tc = Scalar.wrap(tonalCenter, musicTheory.octaveDivisions);
    this.setState({
      tonalCenter: tc,
    })
  }

  shiftIntervalSet(rotation) {
    this.setState({
      intervalSet: IntervalSetFactory.fromShift(
        this.state.intervalSet,
        rotation
      ),
    });
  }

  toggleInterval(interval) {
    this.setState({
      intervalSet: IntervalSetFactory.fromToggledInterval(
        this.state.intervalSet,
        interval
      ),
    });
  }

  render() {
    return (
      <div className="App">
        <Marquee
          tonalCenter={this.state.tonalCenter}
          intervalSet={this.state.intervalSet}
          noteSet={this.noteSet()}
        />
        <Wheel
          setTonalCenter={tc => this.setTonalCenter(tc)}
          shiftIntervalSet={(r) => this.shiftIntervalSet(r)}
          intervalSet={this.state.intervalSet}
          noteSet={this.noteSet()}
          toggleInterval={interval => this.toggleInterval(interval)}
        />
      </div>
    );
  }
}
