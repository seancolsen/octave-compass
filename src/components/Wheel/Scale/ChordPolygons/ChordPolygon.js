import React from 'react';
import IntervalSetPolygon from "components/common/IntervalSetPolygon";
import styled from 'styled-components';
import {Motion, spring} from 'react-motion';

const Shape = styled(IntervalSetPolygon)`
  fill: ${p => p.fill};
  opacity: ${p => p.opacity};
`;

export default function ChordPolygon(props) {
  const slowSpring = value => spring(value, {stiffness: 40, damping: 20});
  return (
    <Motion defaultStyle={{opacity: 1}} style={{opacity: slowSpring(0)}}>
      {value => <Shape
        intervalSet={props.ordinalChord.intervalSet}
        fill={props.ordinalChord.chord.color}
        opacity={value.opacity}
        className={props.className}
      />}
    </Motion>
  );
}
