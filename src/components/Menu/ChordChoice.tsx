import React from "react";
import styled from 'styled-components';
import { ChordIcon } from "./ChordIcon";
import { Chord } from "../../Utils/Music/Chord";

const ChordName = styled.div``;

interface StyledDivProps {
  selected: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
  margin: 0.4vmax;
  padding: 0.4vmax;
  border-radius: 0.4vmax;
  border: solid 0.4vmax transparent;
  background: ${p => p.selected ? 'white' : 'none'};
  &, 
  & * {
    cursor: pointer;
  }
  & svg {
    display: block;
    width: 3.5vmax;
    margin: auto;
  }
  &:hover {
    border-color: white;
  }
  &:hover ${ChordName} {
    text-decoration: underline;
  }
`;

interface Props {
  chord: Chord;
  className?: string;
  selected: boolean;

  /**
   * This function is executed when clicking on the ChordChoice. 
   */
  toggleChord(c: Chord): void;
}

export function ChordChoice(props: Props) {
  return (
    <StyledDiv
      className={props.className}
      onClick={(e) => props.toggleChord(props.chord)}
      selected={props.selected}
    >
      <ChordIcon
        chord={props.chord}
      />
      <ChordName>
        {props.chord.defaultName}
      </ChordName>
    </StyledDiv>
  );
}
