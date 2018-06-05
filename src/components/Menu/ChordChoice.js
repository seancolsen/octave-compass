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
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: solid 5px transparent;
  background: ${p => p.selected ? 'white' : 'none'};
  &, 
  & * {
    cursor: pointer;
  }
  & svg {
    display: block;
    width: 30px;
    margin: auto;
  }
  &:hover {
    border-color: white;
  }
  &:hover ${ChordName} {
    text-decoration: underline;
  }
`;
