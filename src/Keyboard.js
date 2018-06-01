import React from 'react';
import Rotatable from "Rotatable";
import KeySet from "KeySet";
import Angle from "Utils/Angle";

function Keyboard(props) {
  const rotation = props.rotation - props.tonalCenter;
  const transform = `rotate(${Angle.iToD(-props.tonalCenter)})`;
  return (
    <g transform={transform}>
      <KeySet
        pitchSet={props.pitchSet.compliment}
        active={false}
        rotation={rotation}
      />
      <KeySet
        pitchSet={props.pitchSet}
        active={!props.somethingIsRotating}
        rotation={rotation}
        playNotes={props.playNotes}
      />
    </g>
  );
}

export default Rotatable(Keyboard);
