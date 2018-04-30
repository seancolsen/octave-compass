import React, {Component} from 'react';
import Points from './Utils/Points.js';

export default class Polygon extends Component {
  render() {
    let pointsString = Points.stringFromIR(this.props.points);
    let rotation = this.props.rotation || 0;
    let transformString = `rotate(${rotation})`;
    return (
      <polygon points={pointsString} transform={transformString}/>
    );
  }
}
