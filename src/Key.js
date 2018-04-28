import React, {Component} from 'react';
import Point from './Utils/Point';
import Polygon from './Polygon';

const R_INNER = 56;
const R_OUTER = 75;

class Key extends Component {
  render() {
    let basicPoints = [
      [-0.5, R_OUTER * Point.rFactorAtEdge],
      [0, R_OUTER],
      [0.5, R_OUTER * Point.rFactorAtEdge],
      [0.5, R_INNER * Point.rFactorAtEdge],
      [0, R_INNER],
      [-0.5, R_INNER * Point.rFactorAtEdge],
    ];
    let shiftedPoints = basicPoints.map((a) => [a[0] + this.props.interval, a[1]]);
    return (
      <Polygon points={shiftedPoints} />
    );
  }
}

export default Key;