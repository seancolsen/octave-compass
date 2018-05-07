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
   * Generate array of Key components
   *
   * @return {any[]}
   */
  keys() {
    return musicTheory.notes.map((noteData, index) => {
      const note = new Note(noteData);
      return (
        <Key
          key={index}
          label={note.name(this.useNames())}
          color={note.color}
          interval={index}
          rotation={this.props.rotation}
          active={false}
        />
      );
    });
  }

  render() {
    return <g>{this.keys()}</g>;
  }

}

export default Rotatable(Keyboard);
