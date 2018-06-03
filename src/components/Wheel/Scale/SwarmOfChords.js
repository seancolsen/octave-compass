import React from 'react';
import SliceOfChords from "components/Wheel/Scale/SliceOfChords";

export default function SwarmOfChords(props) {
  const ordinalChordSets = props.intervalSet.ordinalChordSets(
    props.selectedChords
  );
  const slices = ordinalChordSets.map((ordinalChordSet, index) =>
    <SliceOfChords
      key={index}
      chordSet={ordinalChordSet.chordSet}
      ordinal={ordinalChordSet.ordinal}
      rotation={props.rotation}
      somethingIsRotating={props.somethingIsRotating}
      playIntervals={props.playIntervals}
    />
  );
  return <g>{slices}</g>;
}
