import React, {Component} from 'react';
import Polygon from "./Polygon";
import IrPoint from './Utils/IrPoint'
import styled from 'styled-components';
import Rotatable from "./Rotatable";

const RADIUS = 56;

function Scale(props) {
  let intervals = [0, 2, 4, 5, 7, 9, 11];
  let points = intervals.map(i => IrPoint.fromArray([i, RADIUS]));
  return (
    <Polygon className={props.className} points={points}/>
  );
}

const StyledScale = styled(Scale)`
  fill: #e4e4e4;
  filter: drop-shadow( 0 0 3px #000 );
`;

export default Rotatable(StyledScale);
