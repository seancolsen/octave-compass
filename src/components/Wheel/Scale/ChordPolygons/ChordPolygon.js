import React from 'react';
import IntervalSetPolygon from "components/common/IntervalSetPolygon";
import {Motion, spring} from 'react-motion';

export default function ChordPolygon(props) {
  const slowSpring = value => spring(value, {stiffness: 40, damping: 20});
  return (
    <Motion defaultStyle={{opacity: 1}} style={{opacity: slowSpring(0)}}>
      {value => <IntervalSetPolygon
        intervalSet={props.ordinalChord.intervalSet}
        fill={props.ordinalChord.chord.color}
        opacity={value.opacity}
        className={props.className}
      />}
    </Motion>
  );
}
