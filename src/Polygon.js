import React, {Component} from 'react';
import Points from './Utils/Points.js';
import Angle from './Utils/Angle.js';

export default class Polygon extends Component {
  render() {
    let pointsString = Points.stringFromIR(this.props.points);
    let rotation = Angle.i_d(this.props.rotation || 0);
    let transformString = `rotate(${rotation})`;
    return (
      <polygon
        points={pointsString}
        transform={transformString}
        onClick={this.props.onClick}
      />
    );
  }
}
