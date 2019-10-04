import React from 'react';
import styled from 'styled-components';
import { ChordSelection } from './Menu/ChordSelection';
import { ChordSet } from '../Utils/Music/ChordSet';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { Chord } from '../Utils/Music/Chord';

const StyledDiv = styled.div`
overflow: scroll;
`;

interface Props {
  className?: string;
  setChordSet(cs: ChordSet): void;
  selectedChords: ChordSet;
  intervalSet: IntervalSet;
  toggleChord(c: Chord): void;
}

export function Menu(props: Props) {
  return (
    <StyledDiv className={props.className} id='menu'>
      <ChordSelection
        selectedChords={props.selectedChords}
        setChordSet={props.setChordSet}
        toggleChord={props.toggleChord}
        intervalSet={props.intervalSet}
      />
    </StyledDiv>
  );
}