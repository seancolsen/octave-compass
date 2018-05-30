import React from 'react';
import Polygon from "./Polygon";
import IrPoint from './Utils/IrPoint'
import styled from 'styled-components';
import Rotatable from "./Rotatable";
import SwarmOfChords from "./SwarmOfChords";

const RADIUS = 310;

function Scale(props) {
  const intervals = props.intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, RADIUS]));
  return (
    <g>
      <Polygon className={props.className} points={points}/>
      <SwarmOfChords
        intervalSet={props.intervalSet}
        selectedChords={props.selectedChords}
        rotation={props.rotation}
      />
    </g>
  );
}

const StyledScale = styled(Scale)`
  fill: #E1E1E1;
  filter: url(#drop-shadow);
  stroke: #f7f7f7;
  stroke-width: 3px;
`;

export default Rotatable(StyledScale);
