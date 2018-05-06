import React, {Component} from 'react';
import Key from "./Key.js";
import {musicTheory} from "./Data/musicTheory.js";
import Note from './Utils/Note';
import Rotatable from "./Rotatable";

class Keyboard extends Component {
  render() {
    const keys = musicTheory.notes.map((noteData, index) => {
      const note = new Note(noteData);
      return (
        <Key
          key={index}
          label={note.name('flat')}
          color={note.color}
          interval={index}
          rotation={this.props.rotation}
        />
      );
    });
    return (
      <g>
        {keys}
      </g>
    );
  }
}

export default Rotatable(Keyboard);
