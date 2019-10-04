import React from "react";
import styled from 'styled-components';
import { ChordSet } from "../../Utils/Music/ChordSet";
import { ChordChoices } from "./ChordChoices";
import { IntervalSet } from "../../Utils/Music/IntervalSet";
import { Chord } from "../../Utils/Music/Chord";

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    margin: 0 1vmax 0.5vmax 1vmax;
  }
`;

const StyledA = styled.a`
  font-style: italic;
`;

interface Props {
  className?: string;
  setChordSet(cs: ChordSet): void;
  selectedChords: ChordSet;
  intervalSet: IntervalSet;
  toggleChord(c: Chord): void;
}

export function ChordSelection(props: Props) {
  const defaultChordsAreSelected =
    props.selectedChords.equals(ChordSet.fromDefaultChords);
  return (
    <div className={props.className}>
      <Heading>
        <h2>Chords in scale</h2>
        { defaultChordsAreSelected &&
          <StyledA
            onClick={e => props.setChordSet(ChordSet.fromAllChords)}
          >
            show all
          </StyledA>
        }
        { !defaultChordsAreSelected &&
          <StyledA
            onClick={e => props.setChordSet(ChordSet.fromDefaultChords)}
          >
            Show default
          </StyledA>
        }
      </Heading>
      <ChordChoices
        selectedChords={props.selectedChords}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </div>
  );
}
