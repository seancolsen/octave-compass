import React, {Component} from 'react';
import Point from './Utils/Point';

const R_INNER = 75;
const R_OUTER = 100;

class Key extends Component {

  points() {
    let p = [
      [-0.5, R_OUTER],
      [0, R_OUTER],
      [0.5, R_OUTER],
      [0.5, R_INNER],
      [0, R_INNER],
      [-0.5, R_INNER],
    ];
    return p.map((a) => Point.ir_xy(a));
  }

  render() {
    let points = this.points();
    return (
      <polygon points={points.map((a) => a.join(',')).join(' ')} />
    );
  }
}

export default Key;