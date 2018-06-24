import React from 'react';
import KeySet from "components/Wheel/Keyboard/KeySet";
import Angle from "Utils/Geometry/Angle";

export default function Keyboard(props) {
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
