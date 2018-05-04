import React, {Component} from 'react';
import Key from "./Key.js";
import {musicTheory} from "./Data/musicTheory.js";
import Note from './Utils/Note';

export default class Keyboard extends Component {
  render() {
    const keys = musicTheory.notes.map((note, index) => {
      const label = Note.prettyName(note.flatName);
      return (
        <Key key={index} label={label} interval={index}/>
      );
    });
    return (
      <g>
        {keys}
      </g>
    );
  }
}
