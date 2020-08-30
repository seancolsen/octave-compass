import React from 'react';
import { BaseInterval } from './Base/BaseInterval';
import { musicTheory } from '../../Data/musicTheory';
import { useStore } from '../Store';
import { observer } from 'mobx-react-lite';

interface Props {
  scaleIsRotating: boolean;
};

export const Base = observer((props: Props) => {
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
      clickable={ordinal !== 0 && store.editVsPlay === 0}
    />
  );

  return <g>{baseIntervals}</g>;

});
