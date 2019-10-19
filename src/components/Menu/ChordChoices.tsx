import React from "react";
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

export function ChordChoices(props: Props) {

  const chordSet = ChordSet.fromContainingIntervalSet(props.intervalSet);
  const chordsInScale = chordSet.chords;
  const chordChoices = chordsInScale.map(chord =>
    <ChordChoice
      key={chord.binary}
      chord={chord}
      toggleChord={props.toggleChord}
      selected={props.selectedChords.containsChord(chord)}
    />
  );

  return (
    <Container className={props.className}>
      {chordChoices}
    </Container>
  );

}
