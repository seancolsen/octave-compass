import React, {Component} from 'react';
import Scalar from './Utils/Scalar';
import Polygon from './Polygon';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import KeyLabel from "./KeyLabel";

const R_INNER = 280;
const R_OUTER = 375;

const Background = styled(Polygon)`
  fill: ${props => props.active ? '#e4e4e4' : '#949494'};
  stroke: #949494;
`;

const labelSpread = 0.22;

export default class Key extends Component {

  labels() {
    if (this.props.label.constructor === Array) {
      return [
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
      [-0.5, R_OUTER * Scalar.rFactorAtEdge],
      [0, R_OUTER],
      [0.5, R_OUTER * Scalar.rFactorAtEdge],
      [0.5, R_INNER * Scalar.rFactorAtEdge],
      [0, R_INNER],
      [-0.5, R_INNER * Scalar.rFactorAtEdge],
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
