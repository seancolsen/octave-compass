import React from "react";
import ChordEmblem from "components/common/ChordEmblem";
import styled from 'styled-components';

function ChordChoice(props) {
  const size = 100;
  return (
    <div className={props.className}>
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
      <div>{props.chord.defaultName}</div>
      <div><button>Enable</button></div>
      <div><button>View</button></div>
    </div>
  );
}

export default styled(ChordChoice)`
  margin: 10px;
  & svg {
    display: block;
    width: 30px;
    margin: auto;
  }
`;
