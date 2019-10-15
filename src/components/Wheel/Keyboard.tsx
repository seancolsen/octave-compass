import React from 'react';
import { PitchSet } from '../../Utils/Music/PitchSet';
import { Angle } from '../../Utils/Geometry/Angle';
import { KeySet } from './Keyboard/KeySet';

interface Props {
  rotation: number;
  tonalCenter: number;
  pitchSet: PitchSet;
  somethingIsRotating: boolean;
  playNotes(noteIds: number[]): void;
}

export function Keyboard(props: Props) {
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
