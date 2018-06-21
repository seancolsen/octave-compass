import React from "react";
import IntervalSetFactory from "Utils/Music/IntervalSetFactory";
import Scalar from "Utils/Math/Scalar";
import Marquee from "components/Marquee";
import Wheel from "components/Wheel";
import Notation from "components/Notation";
import Menu from "components/Menu";
import ChordSet from "Utils/Music/ChordSet";
import WithComputedState from "components/WithComputedState";
import WithAudio from "components/WithAudio";
import RouteProcessor from "components/RouteProcessor";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tonalCenter: 0,
      intervalSet: IntervalSetFactory.fromBinary(0b101010110101),
      selectedChords: ChordSet.fromDefaultChords,
      clef: 'treble',
    };
  }

  shiftTonalCenter = (intervalDiff) => {
    const tc = Scalar.wrapToOctave(this.state.tonalCenter - intervalDiff);
    this.setState({
      tonalCenter: tc,
    })
  };

  shiftIntervalSet = (rotation) => {
    this.setState({
      intervalSet:
        IntervalSetFactory.fromIntervalSet(
        this.state.intervalSet.shift(rotation)
      ),
    });
  };

  toggleInterval = (ordinal) => {
    this.setState({
      intervalSet: IntervalSetFactory.fromIntervalSet(
        this.state.intervalSet.toggleIntervalOrdinal(ordinal)
      ),
    });
  };

  toggleChord = (chord) => {
    this.setState({
      selectedChords: this.state.selectedChords.toggleChord(chord),
    })
  };

  setChordSet = (chordSet) => {
    this.setState({
      selectedChords: chordSet,
    });
  };

  setOrientation = (intervalSet, tonalCenter) => {
    this.setState({
      intervalSet: intervalSet,
      tonalCenter: tonalCenter,
    });
  };

  render() {
    const {intervalSet, tonalCenter, clef, selectedChords} = this.state;

    return (
      <WithComputedState
        intervalSet={intervalSet}
        tonalCenter={tonalCenter}
        clef={clef}
      >{ computedState => (
        <React.Fragment>
          <RouteProcessor
            intervalSet={intervalSet}
            tonalCenter={tonalCenter}
            setOrientation={this.setOrientation}
            windowTitle={computedState.title}
          />
          <WithAudio
            pitchSet={computedState.pitchSet}
            tonalCenter={tonalCenter}
          >{ audio => (
            <div id='app' className="App">
              <Marquee
                intervalSet={intervalSet}
                title={computedState.title}
                inversionText={computedState.inversionText}
                isNamed={computedState.isNamed}
              />
              <Wheel
                shiftTonalCenter={this.shiftTonalCenter}
                shiftIntervalSet={this.shiftIntervalSet}
                intervalSet={intervalSet}
                tonalCenter={tonalCenter}
                pitchSet={computedState.pitchSet}
                toggleInterval={this.toggleInterval}
                selectedChords={selectedChords}
                playNotes={audio.playNotes}
                playIntervals={audio.playIntervals}
                playOrdinalChord={audio.playOrdinalChord}
                ordinalChordsPlayed={audio.ordinalChordsPlayed}
              />
              <Notation
                pitchSet={computedState.pitchSet}
                clef={clef}
              />
              <Menu
                selectedChords={selectedChords}
                setChordSet={this.setChordSet}
                toggleChord={this.toggleChord}
                intervalSet={intervalSet}
              />
            </div>
          )}</WithAudio>
        </React.Fragment>
      )}</WithComputedState>
    );
  }
}
