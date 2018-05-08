import React, {Component} from 'react';
import Scalar from './Utils/Scalar';
import Polygon from './Polygon';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import KeyLabel from "./KeyLabel";
import Arc from './Arc';

const innerRadius = 280;
const outerRadius = 375;
const labelSpread = 0.20;
const labelTieRadius = 0.978 * (innerRadius + outerRadius) / 2;
const labelTieSpan = 0.2;
const labelTieWidth = 50;

const Background = styled(Polygon)`
  fill: ${props => props.active ? '#e4e4e4' : '#949494'};
  stroke: #949494;
`;

const DoubleLabelTie = styled(Arc)`
  stroke: black;
  stroke-width: ${labelTieWidth}px;
`;

export default class Key extends Component {

  labels() {
    if (this.props.label.constructor === Array) {
      return [
        <DoubleLabelTie
          startInterval={this.props.interval - labelTieSpan}
          endInterval={this.props.interval + labelTieSpan}
          radius={labelTieRadius}
        />,
        <KeyLabel
          interval={this.props.interval - labelSpread}
          rotation={this.props.rotation}
          color={this.props.color}
          active={this.props.active}
        >
          {this.props.label[0]}
        </KeyLabel>,
        <KeyLabel
          interval={this.props.interval + labelSpread}
          rotation={this.props.rotation}
          color={this.props.color}
          active={this.props.active}
        >
          {this.props.label[1]}
        </KeyLabel>
      ];
    }
    return (
      <KeyLabel
        interval={this.props.interval}
        rotation={this.props.rotation}
        color={this.props.color}
        active={this.props.active}
      >
        {this.props.label}
      </KeyLabel>
    );
  }

  render() {
    let shape = [
      [-0.5, outerRadius * Scalar.rFactorAtEdge],
      [0, outerRadius],
      [0.5, outerRadius * Scalar.rFactorAtEdge],
      [0.5, innerRadius * Scalar.rFactorAtEdge],
      [0, innerRadius],
      [-0.5, innerRadius * Scalar.rFactorAtEdge],
    ];
    let points = shape.map(ir =>
      IrPoint.fromArray(ir).plus({i: this.props.interval})
    );
    return (
      <g>

        <Background
          points={points}
          active={this.props.active}
        />

        {this.labels()}

      </g>
    );
  }
}
