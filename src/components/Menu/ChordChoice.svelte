<script lang="ts">

</script>

<!-- import React from "react";
import styled from 'styled-components';
import { ChordIcon } from "./ChordIcon";
import { Chord } from "../../Utils/Music/Chord";
import { useStore } from "../Store";

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
}

export function ChordChoice(props: Props) {
  const store = useStore();
  return (
    <StyledDiv
      className={props.className}
      onClick={(e) => store.toggleSelectedChord(props.chord)}
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
} -->
