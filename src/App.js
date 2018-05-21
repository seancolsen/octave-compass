import React, { Component } from 'react';
import './App.css';
import Wheel from "./Wheel.js";
import Marquee from "./Marquee";
import Scalar from "./Utils/Scalar";
import NoteSet from "./Utils/NoteSet";
import IntervalSetFactory from "./Utils/IntervalSetFactory";
import Chord from "./Utils/Chord";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tonalCenter: 0,
      intervalSet: IntervalSetFactory.fromBinary(0b101010110101),
      selectedChords: [
        new Chord(0b000010010001),
        new Chord(0b000010001001),
        new Chord(0b000001001001),
        new Chord(0b010010010001),
        new Chord(0b100010010001),
      ],
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

  shiftTonalCenter(intervalDiff) {
    const tc = Scalar.wrapToOctave(this.state.tonalCenter - intervalDiff);
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
          shiftTonalCenter={i => this.shiftTonalCenter(i)}
          shiftIntervalSet={r => this.shiftIntervalSet(r)}
          intervalSet={this.state.intervalSet}
          tonalCenter={this.state.tonalCenter}
          noteSet={this.noteSet()}
          toggleInterval={interval => this.toggleInterval(interval)}
          selectedChords={this.state.selectedChords}
        />
      </div>
    );
  }
}
