import React, {Component} from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';

const RADIUS = 64;

function KeyLabel(props) {
  let point = (new IrPoint(props.interval, RADIUS)).toXy();
  let transform = `rotate(0) translate(${point.x} ${point.y})`;
  return (
    <text
      className={props.className}
      dominantBaseline={'middle'} // TODO address lack of IE support
      textAnchor={'middle'}
      transform={transform}
    >
      {props.children}
    </text>
  );
}

export default styled(KeyLabel)`
  font-size: 8px;
  fill: black;
`;
