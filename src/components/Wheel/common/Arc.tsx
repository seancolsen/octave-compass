import React, { Component } from 'react';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';

export interface ArcProps {
  startInterval: number;
  endInterval: number;
  radius: number;
  className?: string;
  id?: string;
}

export class Arc extends Component<ArcProps> {

  d() {
    const startInterval = this.props.startInterval;
    const endInterval = this.props.endInterval;
    const radius = this.props.radius;
    const startPoint = (new IrPoint(startInterval, radius)).toXy();
    const endPoint = (new IrPoint(endInterval, radius)).toXy();
    const sweepFlag = startInterval < endInterval ? 1 : 0;
    return [
      "M", startPoint.x, startPoint.y,
      "A", radius, radius, 0, 0, sweepFlag, endPoint.x, endPoint.y
    ].join(" ");
  }

  render() {
    return (
      <path d={this.d()} className={this.props.className} id={this.props.id}/>
    );
  }

}
