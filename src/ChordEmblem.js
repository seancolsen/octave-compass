import React from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';

const circleRadius = 30;
const constellationRadius = 220;

const Background = styled.circle`
  fill: grey;
`;

const Symbol = styled.text`
  fill: white;
  font-size: 25px;
`;

export default function ChordEmblem(props) {
  const point = new IrPoint(props.interval, constellationRadius).toXy();
  return (
    <g>
      <Background cx={point.x} cy={point.y} r={circleRadius}/>
      <Symbol x={point.x} y={point.y}>?</Symbol>
    </g>
  );
}
