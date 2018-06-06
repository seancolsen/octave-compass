import React, {Component} from 'react';
import ChordPolygon from "components/Wheel/Scale/ChordPolygons/ChordPolygon";

export default class ChordPolygons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chordPolygons: [],
    }
  }

  /**
   * Use this React lifecycle to maintain an array of ChordPolygons in state.
   *
   * TODO if chord already exists in state, remove its polygon before adding it.
   *
   * TODO make chords disappear after some time
   *
   * @param props
   * @param state
   * @return {*}
   */
  static getDerivedStateFromProps(props, state) {
    if (!props.mostRecentlyPlayedOrdinalChord) {
      return null;
    }
    const chordPolygonsCopy = (state.chordPolygons || []).slice(0);
    const chordPolygon = <ChordPolygon
      key={props.mostRecentlyPlayedOrdinalChord.chord.binary}
      ordinalChord={props.mostRecentlyPlayedOrdinalChord}
    />;
    return {
      chordPolygons: [chordPolygon].concat(state.chordPolygons),
    };
  }

  render() {
    return (
      <g>
        {this.state.chordPolygons}
      </g>
    );
  }

}
