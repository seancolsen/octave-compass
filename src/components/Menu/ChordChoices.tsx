import React, {Component} from "react";
import styled from 'styled-components';
import { IntervalSet } from "../../Utils/Music/IntervalSet";
import { Chord } from "../../Utils/Music/Chord";
import { ChordSet } from "../../Utils/Music/ChordSet";
import { ChordChoice } from "./ChordChoice";

const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

interface Props {
  intervalSet: IntervalSet;
  selectedChords: ChordSet;
  className?: string;
  toggleChord(c: Chord): void;
}

export class ChordChoices extends Component<Props> {

  chordsInScale() {
    return ChordSet.fromContainingIntervalSet(this.props.intervalSet).chords;
  }

  chordChoices() {
    return this.chordsInScale().map(chord =>
      <ChordChoice
        key={chord.binary} // TODO: Seems like this prop isn't needed. Try deleting.
        chord={chord}
        toggleChord={this.props.toggleChord}
        selected={this.props.selectedChords.containsChord(chord)}
      />
    );
  }

  render() {
    return (
      <Container className={this.props.className}>
        {this.chordChoices()}
      </Container>
    );
  }
}
