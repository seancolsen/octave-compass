import React from 'react';
import Polygon from "./Polygon";

const RADIUS = 56;

function Scale(props) {
  let intervals = [0, 2, 4, 5, 7, 9, 11];
  let points = intervals.map(v => [v, RADIUS]);
  return (
    <Polygon points={points}/>
  )
}

export default Scale;
