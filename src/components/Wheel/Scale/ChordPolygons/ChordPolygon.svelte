<script lang="ts">

</script>

<!-- import React from 'react';
import { Motion, spring } from 'react-motion';
import { IntervalSetPolygon } from '../../../common/IntervalSetPolygon.svelte';
import { OrdinalChord } from '../../../../Utils/Music/OrdinalChord';

interface Props {
  ordinalChord: OrdinalChord;
  radius: number;
  className?: string;
}

export function ChordPolygon(props: Props) {
  const springConfig = {stiffness: 40, damping: 20};
  const slowSpring = (value: number) => spring(value, springConfig);
  return (
    <Motion defaultStyle={{opacity: 1}} style={{opacity: slowSpring(0)}}>
      {value => <IntervalSetPolygon
        intervalSet={props.ordinalChord.intervalSet}
        fill={props.ordinalChord.chord.color}
        opacity={value.opacity}
        className={props.className}
        radius={props.radius}
      />}
    </Motion>
  );
} -->
