import React from 'react';
import SliceOfChords from "components/Wheel/Scale/SliceOfChords";

export default function SwarmOfChords(props) {
    const slices = props.ordinalChordSets.map((ordinalChordSet, index) =>
    <SliceOfChords
      key={index}
      chordSet={ordinalChordSet.chordSet}
      ordinal={ordinalChordSet.ordinal}
      rotation={props.rotation}
      somethingIsRotating={props.somethingIsRotating}
      playOrdinalChord={props.playOrdinalChord}
    />
  );
  return <g>{slices}</g>;
}
