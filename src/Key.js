import React, {Component} from 'react';
import Scalar from './Utils/Scalar';
import Polygon from './Polygon';
import IrPoint from "./Utils/IrPoint";

const R_INNER = 56;
const R_OUTER = 75;

export default class Key extends Component {
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
      <Polygon points={points}/>
    );
  }
}
