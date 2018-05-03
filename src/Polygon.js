import React, {Component} from 'react';
import XyPoint from './Utils/XyPoint';

export default class Polygon extends Component {
  render() {
    let pointsString = XyPoint.stringFromIrArray(this.props.points);
    return <polygon points={pointsString}/>;
  }
}
