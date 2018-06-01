import React from 'react';
import styled from "styled-components";
import {Subtitle} from "components/Marquee/Subtitle";

const Aka = styled.span`
  color: #333;
`;

export default function AlternateScaleNames(props) {

  const weHaveNames = props.intervalSet
    && props.intervalSet.alternateNames
    && props.intervalSet.alternateNames.length > 0;

  if (!weHaveNames) {
    return <Subtitle/>;
  }

  return (
    <Subtitle>
      <Aka>Also know as: </Aka>
      {
        props.intervalSet.alternateNames.map((name, i) =>
          <React.Fragment key={i}>
            {!!i && ', '}
            <span>{name}</span>
          </React.Fragment>
        )
      }

    </Subtitle>

  );
}
