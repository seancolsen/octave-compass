import React from 'react';
import IntervalSetPolygon from "components/common/IntervalSetPolygon";
import styled from 'styled-components';

function ChordPolygon(props) {
  return (
    <IntervalSetPolygon
      intervalSet={props.ordinalChord.intervalSet}
      className={props.className}
    />
  );
}

export default styled(ChordPolygon)`
  fill: ${p => p.ordinalChord.chord.color}
`;