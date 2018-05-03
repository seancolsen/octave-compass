import React, {Component} from 'react';
import Polygon from "./Polygon";
import IrPoint from './Utils/IrPoint'

const RADIUS = 56;

export default function Scale(props) {
  let intervals = [0, 2, 4, 5, 7, 9, 11];
  let points = intervals.map(i => IrPoint.fromArray([i, RADIUS]));
  return (
    <Polygon points={points}/>
  );
}
