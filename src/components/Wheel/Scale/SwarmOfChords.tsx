import React from 'react';
import { SliceOfChords } from './SliceOfChords';
import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';
import { OrdinalChord } from '../../../Utils/Music/OrdinalChord';

interface Props {
  ordinalChordSets: OrdinalChordSet[];
  rotation: number;
  somethingIsRotating: boolean;
  playOrdinalChord(oc: OrdinalChord): void;
}

export function SwarmOfChords(props: Props) {
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
