import React from 'react';
import ChordEmblem from "./ChordEmblem";

export default function SliceOfChords(props) {
  return (
    <g>
      {
        props.chordSet.chords.map((chord, index) =>
          <ChordEmblem
            key={index}
            chord={chord}
            interval={props.chordSet.ordinal}
          />
        )
      }
    </g>
  );
}