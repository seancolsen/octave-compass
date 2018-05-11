import React from 'react';
import Rotatable from "./Rotatable";
import KeySet from "./KeySet";

function Keyboard(props) {
  return (
    <g>
      <KeySet
        noteSet={props.noteSet.compliment}
        active={false}
        rotation={props.rotation}
      />
      <KeySet
        noteSet={props.noteSet}
        active={!props.isRotating}
        rotation={props.rotation}
      />
    </g>
  );
}

export default Rotatable(Keyboard);
