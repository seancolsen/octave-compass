<script lang="ts">

</script>

<!-- import React from 'react';
import { Angle } from '../../Utils/Geometry/Angle';
import { KeySet } from './Keyboard/KeySet';
import { useStore } from '../Store';
import { observer } from 'mobx-react-lite';

interface Props {
  rotation: number;
  somethingIsRotating: boolean;
}

export const Keyboard = observer((props: Props) => {
  const store = useStore();
  const rotation = props.rotation - store.tonalCenter;
  const transform = `rotate(${Angle.iToD(-store.tonalCenter)})`;
  return (
    <g transform={transform} filter="url('#shadow-when-edit')">
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
}) -->
