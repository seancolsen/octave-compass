import React, {Component} from 'react';
import Rotatable from "components/Wheel/Rotatable";
import SwarmOfChords from "components/Wheel/Scale/SwarmOfChords";
import Brand from "components/Wheel/Scale/Brand";
import ChordPolygons from "components/Wheel/Scale/ChordPolygons";
import IntervalSetPolygon from "components/common/IntervalSetPolygon";
import styled from "styled-components";
import OrdinalChordSet from "Utils/Music/OrdinalChordSet";

const Background = styled(IntervalSetPolygon)`
  fill: #E1E1E1;
  filter: url(#drop-shadow);
  stroke: #f7f7f7;
  stroke-width: 3px;
  cursor: grab;
`;

class Scale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mostRecentlyPlayedOrdinalChord: null,
    };
  }

  playOrdinalChord(ordinalChord) {
    this.setState({
      mostRecentlyPlayedOrdinalChord: ordinalChord,
    });
    this.props.playIntervals(ordinalChord.intervalSet.ordinals);
  }

  render() {
    const ordinalChordSets = OrdinalChordSet.arrayFromIntervalSet(
      this.props.intervalSet,
      this.props.selectedChords
    );
    return (
      <g>
        <Background intervalSet={this.props.intervalSet}/>
        <Brand rotation={this.props.rotation}/>
        <ChordPolygons
          ordinalChordSets={ordinalChordSets}
          mostRecentlyPlayedOrdinalChord={
            this.state.mostRecentlyPlayedOrdinalChord
          }
        />
        <SwarmOfChords
          ordinalChordSets={ordinalChordSets}
          rotation={this.props.rotation}
          somethingIsRotating={this.props.somethingIsRotating}
          playOrdinalChord={(oc) => this.playOrdinalChord(oc)}
        />
      </g>
    );
  }

}

export default Rotatable(Scale);
