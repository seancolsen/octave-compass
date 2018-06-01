import React from 'react';
import Polygon from "components/Wheel/common/Polygon";
import IrPoint from 'Utils/Geometry/IrPoint'
import styled from 'styled-components';
import Rotatable from "components/Wheel/Rotatable";
import SwarmOfChords from "components/Wheel/Scale/SwarmOfChords";
import Brand from "components/Wheel/Scale/Brand";

const RADIUS = 310;

const Background = styled(Polygon)`
  fill: #E1E1E1;
  filter: url(#drop-shadow);
  stroke: #f7f7f7;
  stroke-width: 3px;
  cursor: grab;
`;

function Scale(props) {
  const intervals = props.intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, RADIUS]));
  return (
    <g>
      <Background points={points}/>
      <Brand rotation={props.rotation}/>
      <SwarmOfChords
        intervalSet={props.intervalSet}
        selectedChords={props.selectedChords}
        rotation={props.rotation}
        somethingIsRotating={props.somethingIsRotating}
        playIntervals={props.playIntervals}
      />
    </g>
  );
}

export default Rotatable(Scale);
