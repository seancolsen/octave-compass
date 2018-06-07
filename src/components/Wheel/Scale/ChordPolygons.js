import React from 'react';
import ChordPolygon from "components/Wheel/Scale/ChordPolygons/ChordPolygon";
import Angle from "Utils/Geometry/Angle";
import styled from "styled-components";

const StyledG = styled.g`
  & * {
    cursor: grab;
  }
`;

export default function ChordPolygons(props) {
  let transform = `rotate(${-Angle.iToD(props.rotation)})`;
  return (
    <StyledG transform={transform}>
      {[...props.ordinalChordsPlayed.log].map(([key, ordinalChord]) =>
        <ChordPolygon
          key={key}
          ordinalChord={ordinalChord}
        />
      )}
    </StyledG>
  )
}
