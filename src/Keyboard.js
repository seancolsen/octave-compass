import React, {Component} from 'react';
import Key from "./Key.js";
import {musicTheory} from "./Data/musicTheory.js";
import Note from './Utils/Note';
import Rotatable from "./Rotatable";
import Scalar from './Utils/Scalar';
import NoteSet from './Utils/NoteSet';

class Keyboard extends Component {

  /**
   * Determine which types of possibleNames to use for keys based on the rotation of the
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
    return this.props.noteSet.notes.map(note => {
      return (
        <Key
          key={note.id}
          label={note.keyLabel}
          color={note.color}
          interval={note.id}
          rotation={this.props.rotation}
          active={this.keyIsActive(note.id)}
        />
      );
    });
  }

  render() {
    return <g>{this.keys()}</g>;
  }

}

export default Rotatable(Keyboard);
