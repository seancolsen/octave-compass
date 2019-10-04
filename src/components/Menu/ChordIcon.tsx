import React from 'react';
import { Chord } from '../../Utils/Music/Chord';
import { ChordEmblem } from '../common/ChordEmblem';

interface Props {
  chord: Chord;
}

export function ChordIcon(props: Props) {
  const size = 100;
  return (
    <svg
      viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
    >
      <ChordEmblem
        size={size / 2}
        chord={props.chord}
      />
    </svg>
  );
}
