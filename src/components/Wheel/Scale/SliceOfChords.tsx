import React from 'react';
import { ChordSet } from '../../../Utils/Music/ChordSet';
import { ChordInScale } from './ChordInScale';
import { Note } from '../../../Utils/Music/Note';

const constellationRadius = 295;
const maxRadialSpacing = 5;
const circleRadius = 40;
const centerDeadZone = 60;

interface Props {
  chordSet: ChordSet;
  note?: Note;
  ordinal: number;
  rotation: number;
}

export function SliceOfChords(props: Props) {

  const radialSpacing = (() => {
    const total = props.chordSet.totalEmblemSize * circleRadius * 2;
    const overShoot = constellationRadius - centerDeadZone - total;
    const spacing = overShoot / (props.chordSet.count - 1);
    return Math.min(spacing, maxRadialSpacing);
  })();

  const chords = (() => {
    let result: JSX.Element[] = [];
    let radialPosition = constellationRadius + radialSpacing;
    props.chordSet.chords.forEach((chord, index) => {
      const size = chord.emblemSize * circleRadius;
      radialPosition -= size + radialSpacing;
      result.push(
        <ChordInScale
          key={index}
          note={props.note}
          radialPosition={radialPosition}
          size={size}
          chord={chord}
          interval={props.ordinal}
          rotation={props.rotation}
        />
      );
      radialPosition -= size;
    });
    return result;
  })();

  return <g>{chords}</g>;

}