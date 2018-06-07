import React from 'react';
import ChordPolygon from "components/Wheel/Scale/ChordPolygons/ChordPolygon";
import Angle from "Utils/Geometry/Angle";

export default function ChordPolygons(props) {
  let transform = `rotate(${-Angle.iToD(props.rotation)})`;
  return (
    <g transform={transform}>
      {[...props.ordinalChordsPlayed.log].map(([key, ordinalChord]) =>
        <ChordPolygon
          key={key}
          ordinalChord={ordinalChord}
        />
      )}
    </g>
  )
}
