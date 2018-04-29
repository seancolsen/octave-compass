import React, {Component} from 'react';
import Point from './Utils/Point.js';

export default class Polygon extends Component {
  render() {
    let pointsInXY = this.props.points.map((a) => Point.ir_xy(a));
    let pointsString = pointsInXY.map((a) => a.join(',')).join(' ');
    return (
      <polygon points={pointsString}/>
    );
  }
}
