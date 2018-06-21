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
import Url from "Utils/Text/Url";
import Modal from 'react-responsive-modal';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    const stateFromUrl = App.stateFromUrl();
    this.state = {
      tonalCenter: stateFromUrl.tonalCenter,
      intervalSet: stateFromUrl.intervalSet,
      selectedChords: ChordSet.fromDefaultChords,
      clef: 'treble',
      modalIsOpen: false,
    };
  }

  static stateFromUrl() {
    return Url.parse(window.location.pathname);
  }

  updateStateFromUrl() {
    this.setState(App.stateFromUrl());
  }

  componentDidMount() {
    window.addEventListener('popstate', () => this.updateStateFromUrl());
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

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    })
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
                showMore={this.toggleModal}
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
              <Modal
                open={this.state.modalIsOpen}
                onClose={this.toggleModal}
              >
                <Marquee
                  intervalSet={intervalSet}
                  title={computedState.title}
                  inversionText={computedState.inversionText}
                  isNamed={computedState.isNamed}
                  isWithinModal={true}
                />
              </Modal>
            </div>
          )}</WithAudio>
        </React.Fragment>
      )}</WithComputedState>
    );
  }
}
