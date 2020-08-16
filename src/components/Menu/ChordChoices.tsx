import React from "react";
import styled from 'styled-components';
import { ChordSet } from "../../Utils/Music/ChordSet";
import { ChordChoice } from "./ChordChoice";
import { useStore } from "../Store";
import { observer } from "mobx-react-lite";

const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

interface Props {
  className?: string;
}

export const ChordChoices = observer<Props>((props: Props) => {
  const store = useStore();
  const chordSet = ChordSet.fromContainingIntervalSet(store.intervalSet);
  const chordsInScale = chordSet.chords;
  const chordChoices = chordsInScale.map(chord =>
    <ChordChoice
      key={chord.binary}
      chord={chord}
      selected={store.selectedChords.containsChord(chord)}
    />
  );

  return (
    <Container className={props.className}>
      {chordChoices}
    </Container>
  );

});
