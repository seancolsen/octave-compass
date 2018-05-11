import React from "react";
import Key from "./Key";

export default function KeySet(props) {
  return props.noteSet.notes.map(note => {
    return (
      <g>
        <Key
          key={note.id}
          note={note}
          rotation={props.rotation}
          active={props.active}
        />
      </g>
    );
  });
}
