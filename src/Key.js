import React, {Component} from 'react';
import Point from './Utils/Point';

const R_INNER = 56;
const R_OUTER = 75;

class Key extends Component {

  points() {
    let p = [
      [-0.5, R_OUTER * Point.rFactorAtEdge ],
      [0,    R_OUTER                       ],
      [0.5,  R_OUTER * Point.rFactorAtEdge ],
      [0.5,  R_INNER * Point.rFactorAtEdge ],
      [0,    R_INNER                       ],
      [-0.5, R_INNER * Point.rFactorAtEdge ],
    ];
    p = p.map((a) => [a[0] + this.props.interval, a[1]]);
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