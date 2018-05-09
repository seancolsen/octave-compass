import React, {Component} from 'react';
import Key from "./Key.js";
import {musicTheory} from "./Data/musicTheory.js";
import Note from './Utils/Note';
import Rotatable from "./Rotatable";
import Scalar from './Utils/Scalar';
import NoteSet from './Utils/NoteSet';

class Keyboard extends Component {

  /**
   * Determine which types of names to use for keys based on the rotation of the
   * keyboard.
   *
   * @return {string}
   *   e.g. 'flat', 'sharp', or 'both'
   */
  useNames() {
    if (this.props.isRotating) {
      return 'both';
    }
    return this.noteSet.nameType;
  }

  /**
   * Return the set of notes that are currently active.
   *
   * @return {NoteSet[]}
   */
  get noteSet() {
    return NoteSet.fromIntervalSet(this.props.intervalSet, this.props.rotation);
  }

  /**
   * @param {int} interval
   * @return {bool}
   */
  keyIsActive(interval) {
    return (this.props.isRotating) ? false :
      this.props.intervalSet.shift(-this.props.rotation).isActive(interval);
  }

  /**
   * Generate array of Key components
   *
   * @return {any[]}
   */
  keys() {
    return musicTheory.notes.map((noteData, interval) => {
      const note = new Note(noteData);
      return (
        <Key
          key={interval}
          label={note.name(this.useNames())}
          color={note.color}
          interval={interval}
          rotation={this.props.rotation}
          active={this.keyIsActive(interval)}
        />
      );
    });
  }

  render() {
    return <g>{this.keys()}</g>;
  }

}

export default Rotatable(Keyboard);
