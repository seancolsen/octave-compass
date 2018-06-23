import React from "react";
import styled from 'styled-components';
import ChordIcon from "components/Menu/ChordIcon";

const ChordName = styled.div``;

function ChordChoice(props) {
  return (
    <div
      className={props.className}
      onClick={(e) => props.toggleChord(props.chord)}
    >
      <ChordIcon
        chord={props.chord}
      />
      <ChordName>
        {props.chord.defaultName}
      </ChordName>
    </div>
  );
}

export default styled(ChordChoice)`
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
