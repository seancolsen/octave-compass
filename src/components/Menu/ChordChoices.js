import React, {Component} from "react";
import ChordChoice from "components/Menu/ChordChoice";
import styled from 'styled-components';
import ChordSet from "Utils/Music/ChordSet";

class ChordChoices extends Component {

  chordsInScale() {
    return ChordSet.fromContainingIntervalSet(this.props.intervalSet).chords;
  }

  chordChoices() {
    return this.chordsInScale().map(chord =>
      <ChordChoice
        key={chord.binary}
        chord={chord}
        toggleChord={this.props.toggleChord}
        selected={this.props.selectedChords.containsChord(chord)}
      />
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.chordChoices()}
      </div>
    );
  }
}

export default styled(ChordChoices)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;