import React, {Component} from "react";
import IntervalSetFactory from "Utils/Music/IntervalSetFactory";
import Chord from "Utils/Music/Chord";
import NoteSet from "Utils/Music/NoteSet";
import Scalar from "Utils/Math/Scalar";
import Tone from "tone";
import Url from "Utils/Text/Url";
import Marquee from "components/Marquee";
import Wheel from "components/Wheel";
import Notation from "components/Notation";
import Menu from "components/Menu";

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
      clef: 'treble',
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

  /**
   * Calculate the current pitches based on the current notes.
   */
  pitchSet() {
    // TODO: Set octave based on this.state.clef
    const octave = 4;
    return this.noteSet().pitchSetStartingFrom(octave);
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

  /**
   * Generate sound for an array of notes, given their IDs.
   *
   * @param {int[]} noteIds
   */
  playNotes(noteIds) {
    const pitches = this.pitchSet().pitches.filter(pitch =>
      noteIds.includes(pitch.note.id)
    ).map(pitch => pitch.frequency);
    const synth = new Tone.PolySynth(pitches.length, Tone.Synth).toMaster();
    synth.triggerAttackRelease(pitches, "8n", "+0.03")
  }

  /**
   * Generate sound for an array of intervals, given their ordinals.
   *
   * @param {int[]} ordinals
   */
  playIntervals(ordinals) {
    const notes = ordinals.map(ordinal =>
      Scalar.wrapToOctave(ordinal + this.state.tonalCenter)
    );
    this.playNotes(notes);
  }

  componentDidMount() {
    this.updateStateFromUrl();
  }

  componentDidUpdate() {
    this.updateWindowFromState();
  }

  updateStateFromUrl() {
    const url = window.location.pathname;
    const parts = Url.parse(url);
    this.setState({
      intervalSet: parts.intervalSet,
      tonalCenter: parts.tonalCenter,
    });
  }

  updateWindowFromState() {
    // Set page title
    const appTitle = 'Octave Compass';
    const intervalSetName = this.state.intervalSet.displayName;
    const tonalCenter = this.noteSet().tonalCenterName;
    const title = `${intervalSetName} in ${tonalCenter} | ${appTitle}`;
    document.title = title;

    // Set URL
    const url = Url.generate(this.state.intervalSet, this.state.tonalCenter);
    window.history.pushState(null, title, url);
  }

  render() {
    return (
      <div id='app' className="App">
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
          pitchSet={this.pitchSet()}
          toggleInterval={interval => this.toggleInterval(interval)}
          selectedChords={this.state.selectedChords}
          playNotes={noteIds => this.playNotes(noteIds)}
          playIntervals={ordinals => this.playIntervals(ordinals)}
        />
        <Notation
          pitchSet={this.pitchSet()}
          clef={this.state.clef}
        />
        <Menu/>
      </div>
    );
  }
}