import React, {Component} from 'react';
import Points from './Utils/Points.js';

export default class Polygon extends Component {
  render() {
    let pointsString = Points.stringFromIR(this.props.points);
    return <polygon points={pointsString}/>;
  }
}
