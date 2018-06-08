import React, {Component} from "react";
import IntervalSetFactory from "Utils/Music/IntervalSetFactory";
import NoteSet from "Utils/Music/NoteSet";
import Scalar from "Utils/Math/Scalar";
import Tone from "tone";
import Url from "Utils/Text/Url";
import Marquee from "components/Marquee";
import Wheel from "components/Wheel";
import Notation from "components/Notation";
import Menu from "components/Menu";
import ChordSet from "Utils/Music/ChordSet";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tonalCenter: 0,
      intervalSet: IntervalSetFactory.fromBinary(0b101010110101),
      selectedChords: ChordSet.fromDefaultChords,
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
      intervalSet:
        IntervalSetFactory.fromIntervalSet(
        this.state.intervalSet.shift(rotation)
      ),
    });
  }

  toggleInterval(ordinal) {
    this.setState({
      intervalSet: IntervalSetFactory.fromIntervalSet(
        this.state.intervalSet.toggleIntervalOrdinal(ordinal)
      ),
    });
  }

  /**
   * Change the state of the selected chords by adding or removing the given
   * chord as necessary.
   *
   * @param {Chord} chord
   */
  toggleChord(chord) {
    this.setState({
      selectedChords: this.state.selectedChords.toggleChord(chord),
    })
  }

  /**
   * Replace the selected chords (in state) with the given ChordSet.
   *
   * @param chordSet
   */
  setChordSet(chordSet) {
    this.setState({
      selectedChords: chordSet,
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
    window.addEventListener('popstate', () => this.updateStateFromUrl());
  }

  updateStateFromUrl() {
    const url = window.location.pathname;
    const parts = Url.parse(url);
    this.setState({
      intervalSet: parts.intervalSet,
      tonalCenter: parts.tonalCenter,
    });
  }

  render() {
    return (
      <div id='app' className="App">
        <Marquee
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
        <Menu
          selectedChords={this.state.selectedChords}
          setChordSet={chordSet => this.setChordSet(chordSet)}
          toggleChord={chord => this.toggleChord(chord)}
          intervalSet={this.state.intervalSet}
        />
      </div>
    );
  }
}
