import React from 'react';
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 75%;
  font-style: italic;
  height: 1em;
`;

const Aka = styled.span`
  color: #333;
`;

export default function AlternateScaleNames(props) {

  const weHaveNames = props.intervalSet
    && props.intervalSet.alternateNames
    && props.intervalSet.alternateNames.length > 0;

  if (!weHaveNames) {
    return <StyledDiv/>;
  }

  return (
    <StyledDiv>
      <Aka>Also know as: </Aka>
      {
        props.intervalSet.alternateNames.map((name, i) =>
          <React.Fragment key={i}>
            {!!i && ', '}
            <span>{name}</span>
          </React.Fragment>
        )
      }

    </StyledDiv>

  );
}
