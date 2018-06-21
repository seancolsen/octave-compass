import React from 'react';
import Scalar from "Utils/Math/Scalar";
import Tone from "tone";
import ObjectLog from "Utils/Misc/ObjectLog";

export default class WithAudio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ordinalChordsPlayed: new ObjectLog(),
    };
  }

  /**
   * Generate sound for an array of notes, given their IDs.
   *
   * @param {int[]} noteIds
   */
  playNotes = (noteIds) => {
    const pitches = this.props.pitchSet.pitches.filter(pitch =>
      noteIds.includes(pitch.note.id)
    ).map(pitch => pitch.frequency);
    const synth = new Tone.PolySynth(pitches.length, Tone.Synth).toMaster();
    synth.triggerAttackRelease(pitches, "8n", "+0.03")
  };

  /**
   * Generate sound for an array of intervals, given their ordinals.
   *
   * @param {int[]} ordinals
   */
  playIntervals = (ordinals) => {
    const notes = ordinals.map(ordinal =>
      Scalar.wrapToOctave(ordinal + this.props.tonalCenter)
    );
    this.playNotes(notes);
  };

  /**
   * Play a chord and highlight it.
   *
   * @param {OrdinalChord} ordinalChord
   */
  playOrdinalChord = (ordinalChord) => {
    this.setState({
      ordinalChordsPlayed: this.state.ordinalChordsPlayed.add(ordinalChord),
    });
    this.playIntervals(ordinalChord.intervalSet.ordinals);
  };

  render() {
    return this.props.children({
      ordinalChordsPlayed: this.state.ordinalChordsPlayed,
      playNotes: this.playNotes,
      playIntervals: this.playIntervals,
      playOrdinalChord: this.playOrdinalChord,
    });
  }
}