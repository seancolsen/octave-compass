import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faMusic, faCaretLeft, faCaretRight }
  from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { IntervalSet } from "../Utils/Music/IntervalSet";
import { IntervalSetFactory } from "../Utils/Music/IntervalSetFactory";
import { Scalar } from "../Utils/Math/Scalar";
import { ChordSet } from "../Utils/Music/ChordSet";
import { WithComputedState } from "./WithComputedState";
import { WithAudio } from "./WithAudio";
import { RouteProcessor } from "./RouteProcessor";
import { Url } from "../Utils/Text/Url";
import { Layout } from "./Layout";
import { Chord } from "../Utils/Music/Chord";

library.add(faPlus, faMinus, faMusic, faCaretLeft, faCaretRight,
  faGithub);

interface Props {

}

interface State {
  tonalCenter: number,
  intervalSet: IntervalSet,
  selectedChords: ChordSet,
  clef: string,
}

export default class App extends React.Component<Props, State> {

  state: State;

  constructor(props: Props) {
    super(props);
    const stateFromUrl = App.stateFromUrl();
    this.state = {
      tonalCenter: stateFromUrl.tonalCenter,
      intervalSet: stateFromUrl.intervalSet,
      selectedChords: ChordSet.fromDefaultChords,
      clef: 'treble',
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

  shiftTonalCenter = (intervalDiff: number) => {
    const tc = Scalar.wrapToOctave(this.state.tonalCenter - intervalDiff);
    this.setState({
      tonalCenter: tc,
    })
  };

  shiftIntervalSet = (rotation: number) => {
    this.setState({
      intervalSet:
        IntervalSetFactory.fromIntervalSet(
          this.state.intervalSet.shift(rotation)
        ),
    });
  };

  shiftMode = (amount: number) => {
    this.setState({
      intervalSet:
        IntervalSetFactory.fromIntervalSet(
          this.state.intervalSet.modeShift(amount)
        ),
    });
  };

  toggleInterval = (ordinal: number) => {
    this.setState({
      intervalSet: IntervalSetFactory.fromIntervalSet(
        this.state.intervalSet.toggleIntervalOrdinal(ordinal)
      ),
    });
  };

  toggleChord = (chord: Chord) => {
    this.setState({
      selectedChords: this.state.selectedChords.toggleChord(chord),
    })
  };

  setChordSet = (chordSet: ChordSet) => {
    this.setState({
      selectedChords: chordSet,
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
            windowTitle={computedState.title}
          />
          <WithAudio
            pitchSet={computedState.pitchSet}
            tonalCenter={tonalCenter}
          >{ audio => (
            <Layout
              intervalSet={intervalSet}
              tonalCenter={tonalCenter}
              selectedChords={selectedChords}
              clef={clef}
              setChordSet={this.setChordSet}
              shiftIntervalSet={this.shiftIntervalSet}
              shiftMode={this.shiftMode}
              shiftTonalCenter={this.shiftTonalCenter}
              toggleChord={this.toggleChord}
              toggleInterval={this.toggleInterval}
              inversionText={computedState.inversionText}
              isNamed={computedState.isNamed}
              pitchSet={computedState.pitchSet}
              title={computedState.title}
              audio={audio}
            />
          )}</WithAudio>
        </React.Fragment>
      )}</WithComputedState>
    );
  }
}
