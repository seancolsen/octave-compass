import React from 'react';
import styled from 'styled-components';
import Angle from "Utils/Geometry/Angle";

const StyledText = styled.text`
  font-size: 50px;
  fill: white;
`;

export default function Brand(props) {
  return (
    <StyledText
      transform={`rotate(${-Angle.iToD(props.rotation)})`}
      dominantBaseline={'middle'} // TODO address lack of IE support
      textAnchor={'middle'}
    >
      <tspan x='0' y='-0.4em'>Octave</tspan>
      <tspan x='0' y='0.4em'>Compass</tspan>
    </StyledText>
  );
}