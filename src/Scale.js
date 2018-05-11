import React from 'react';
import Polygon from "./Polygon";
import IrPoint from './Utils/IrPoint'
import styled from 'styled-components';
import Rotatable from "./Rotatable";

const RADIUS = 280;

function Scale(props) {
  const intervals = props.intervalSet.toArray();
  const points = intervals.map(i => IrPoint.fromArray([i, RADIUS]));
  return (
    <Polygon className={props.className} points={points}/>
  );
}

const StyledScale = styled(Scale)`
  fill: #e4e4e4;
  filter: drop-shadow( 0 0 10px #000 );
`;

export default Rotatable(StyledScale);
