import React, {Component} from 'react';
import Key from "./Key.js";
import {musicTheory} from "./Data/musicTheory.js";
import Note from './Utils/Note';
import Rotatable from "./Rotatable";
import Scalar from './Utils/Scalar';

class Keyboard extends Component {

  /**
   * Determine which types of names to use for keys based on the rotation of the
   * keyboard.
   */
  useNames() {
    const divisions = musicTheory.octaveDivisions;
    const roundRotation = Math.round(this.props.rotation);
    const interval = Scalar.wrap(divisions - roundRotation, divisions);
    const note = new Note(musicTheory.notes[interval]);
    return note.useNames;
  }

  /**
   *
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
