import React from 'react';
import { BaseInterval } from './Base/BaseInterval';
import { IntervalSet } from '../../Utils/Music/IntervalSet';
import { musicTheory } from '../../Data/musicTheory';

interface Props {
  scaleIsRotating: boolean;
  intervalSet: IntervalSet;
  toggleInterval(ordinal: number): void;
}

export function Base(props: Props) {

  const intervalIsActive = (interval: number): boolean => (
    props.scaleIsRotating ? false : props.intervalSet.isActive(interval)
  )

  const baseIntervals = musicTheory.intervals.map((name, ordinal) =>
    <BaseInterval
      key={ordinal}
      interval={ordinal}
      label={name}
      active={intervalIsActive(ordinal)}
      toggleInterval={props.toggleInterval}
    />
  );

  return <g>{baseIntervals}</g>;

}