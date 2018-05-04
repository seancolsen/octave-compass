import React, {Component} from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';

const RADIUS = 60;

function KeyLabel(props) {
  let point = (new IrPoint(props.interval, RADIUS)).toXy();
  return (
    <text className={props.className} x={point.x} y={point.y}>
      {props.children}
    </text>
  );
}

export default styled(KeyLabel)`
  font-size: 10px;
  fill: black;
`;
