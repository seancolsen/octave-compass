import React from 'react';
import { BaseInterval } from './Base/BaseInterval';
import { musicTheory } from '../../Data/musicTheory';
import { useStore } from '../Store';

interface Props {
  scaleIsRotating: boolean;
}

export function Base(props: Props) {
  const store = useStore();

  const intervalIsActive = (interval: number): boolean => (
    props.scaleIsRotating ? false : store.intervalSet.isActive(interval)
  )

  const baseIntervals = musicTheory.intervals.map((name, ordinal) =>
    <BaseInterval
      key={ordinal}
      interval={ordinal}
      label={name}
      active={intervalIsActive(ordinal)}
    />
  );

  return <g>{baseIntervals}</g>;

}