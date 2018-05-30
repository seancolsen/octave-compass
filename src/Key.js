import React from 'react';
import Scalar from './Utils/Scalar';
import Polygon from './Polygon';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import KeyLabelSet from "./KeyLabelSet";

const innerRadius = 308;
const outerRadius = 400;

const Background = styled(Polygon)`
  fill: ${p => p.active ? '#e1e1e1' : '#b7b7b7'};
  stroke: #a7a7a7;
  stroke-width: 3px;
`;

export default function Key(props) {
  const shape = [
    [-0.5, outerRadius * Scalar.rFactorAtEdge],
    [0, outerRadius],
    [0.5, outerRadius * Scalar.rFactorAtEdge],
    [0.5, innerRadius * Scalar.rFactorAtEdge],
    [0, innerRadius],
    [-0.5, innerRadius * Scalar.rFactorAtEdge],
  ];
  const points = shape.map(ir =>
    IrPoint.fromArray(ir).plus({i: props.note.id})
  );
  return (
    <g>

      <Background
        points={points}
        active={props.active}
      />

      <KeyLabelSet
        note={props.note}
        rotation={props.rotation}
        active={props.active}
      />

    </g>
  );
}
