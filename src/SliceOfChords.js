import React, {Component} from 'react';
import ChordEmblem from "./ChordEmblem";

const constellationRadius = 260;
const radialSpacing = 10;
const circleRadius = 40;

export default class SliceOfChords extends Component {

  chordEmblems() {
    let result = [];
    let radialPosition = constellationRadius + radialSpacing;
    this.props.chordSet.chords.forEach((chord, index) => {
      const size = chord.emblemSize * circleRadius;
      radialPosition -= size + radialSpacing;
      result.push(
        <ChordEmblem
          key={index}
          radialPosition={radialPosition}
          size={size}
          chord={chord}
          interval={this.props.chordSet.ordinal}
        />
      );
      radialPosition -= size;
    });
    return result;
  }

  render() {
    return <g>{this.chordEmblems()}</g>;
  }

}