import React from 'react';
import { Angle } from '../../Utils/Geometry/Angle';
import { KeySet } from './Keyboard/KeySet';
import { StoreContext } from '../Store';

interface Props {
  rotation: number;
  somethingIsRotating: boolean;
}

export function Keyboard(props: Props) {
  const store = React.useContext(StoreContext);
  const rotation = props.rotation - store.tonalCenter;
  const transform = `rotate(${Angle.iToD(-store.tonalCenter)})`;
  return (
    <g transform={transform}>
      <KeySet
        pitchSet={store.pitchSet.compliment}
        active={false}
        rotation={rotation}
      />
      <KeySet
        pitchSet={store.pitchSet}
        active={!props.somethingIsRotating}
        rotation={rotation}
      />
    </g>
  );
}
