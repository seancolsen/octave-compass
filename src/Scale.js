import React from 'react';
import Polygon from "./Polygon";
import IrPoint from './Utils/IrPoint'
import styled from 'styled-components';
import Rotatable from "./Rotatable";
import IntervalSetFactory from "./Utils/IntervalSetFactory";
import SwarmOfChords from "./SwarmOfChords";

const RADIUS = 280;

function Scale(props) {
  const intervals = props.intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, RADIUS]));
  const chordSets = IntervalSetFactory.chordSets(
    props.intervalSet,
    props.selectedChords
  );
  return (
    <g>
      <Polygon className={props.className} points={points}/>
      <SwarmOfChords
        intervalSet={props.intervalSet}
        selectedChords={props.selectedChords}
      />
    </g>
  );
}

const StyledScale = styled(Scale)`
  fill: #e4e4e4;
  filter: url(#drop-shadow);
`;

export default Rotatable(StyledScale);
