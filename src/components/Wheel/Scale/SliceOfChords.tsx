import React, { Component } from 'react';
import { ChordSet } from '../../../Utils/Music/ChordSet';
import { OrdinalChord } from '../../../Utils/Music/OrdinalChord';
import { ChordInScale } from './ChordInScale';

const constellationRadius = 295;
const maxRadialSpacing = 5;
const circleRadius = 40;
const centerDeadZone = 60;

interface Props {
  chordSet: ChordSet;
  ordinal: number;
  rotation: number;
  somethingIsRotating: boolean;
  playOrdinalChord(oc: OrdinalChord): void;
}

export class SliceOfChords extends Component<Props> {

  get radialSpacing() {
    const total = this.props.chordSet.totalEmblemSize * circleRadius * 2;
    const overShoot = constellationRadius - centerDeadZone - total;
    const spacing = overShoot / (this.props.chordSet.count - 1);
    return Math.min(spacing, maxRadialSpacing);
  }

  chords(): JSX.Element[] {
    let result: JSX.Element[] = [];
    let radialPosition = constellationRadius + this.radialSpacing;
    this.props.chordSet.chords.forEach((chord, index) => {
      const size = chord.emblemSize * circleRadius;
      radialPosition -= size + this.radialSpacing;
      result.push(
        <ChordInScale
          key={index}
          radialPosition={radialPosition}
          size={size}
          chord={chord}
          interval={this.props.ordinal}
          rotation={this.props.rotation}
          somethingIsRotating={this.props.somethingIsRotating}
          playOrdinalChord={this.props.playOrdinalChord}
        />
      );
      radialPosition -= size;
    });
    return result;
  }

  render() {
    return <g>{this.chords()}</g>;
  }

}