import React, {Component} from 'react';
import Scalar from './Utils/Scalar';
import Polygon from './Polygon';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import KeyLabel from "./KeyLabel";

const R_INNER = 56;
const R_OUTER = 75;

class Key extends Component {
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
        <Polygon className={this.props.className} points={points}/>
        <KeyLabel interval={this.props.interval}>{this.props.label}</KeyLabel>
      </g>
    );
  }
}

export default styled(Key)`
  fill: #e4e4e4;
  stroke: #949494;
`;
