import React from "react";
import ChordEmblem from "components/common/ChordEmblem";
import styled from 'styled-components';

const ChordName = styled.div``;

function ChordChoice(props) {
  const size = 100;
  return (
    <div
      className={props.className}
      onClick={(e) => props.toggleChord(props.chord)}
    >
      <svg
        viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
      >
        <ChordEmblem
          radialPosition={0}
          size={size/2}
          chord={props.chord}
          interval={0}
          rotation={0}
          somethingIsRotating={false}
        />
      </svg>
      <ChordName>
        {props.chord.defaultName}
      </ChordName>
    </div>
  );
}

export default styled(ChordChoice)`
  margin: 5px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background: ${p => p.selected ? 'white' : 'none'};
  & svg {
    display: block;
    width: 30px;
    margin: auto;
  }
  &:hover ${ChordName} {
    text-decoration: underline;
  }
`;
