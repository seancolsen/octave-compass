import React from 'react';
import XyPoint from 'Utils/Geometry/XyPoint';

export default function Polygon(props) {
  let pointsString = XyPoint.stringFromIrArray(props.points);
  return <polygon className={props.className} points={pointsString}/>;
}
