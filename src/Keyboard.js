import React from 'react';
import Rotatable from "./Rotatable";
import KeySet from "./KeySet";
import Angle from "./Utils/Angle";

function Keyboard(props) {
  const rotation = props.rotation - props.tonalCenter;
  const transform = `rotate(${Angle.iToD(-props.tonalCenter)})`;
  return (
    <g transform={transform}>
      <KeySet
        noteSet={props.noteSet.compliment}
        active={false}
        rotation={rotation}
      />
      <KeySet
        noteSet={props.noteSet}
        active={!props.somethingIsRotating}
        rotation={rotation}
      />
    </g>
  );
}

export default Rotatable(Keyboard);
