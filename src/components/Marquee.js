import React from 'react';
import styled from 'styled-components';
import AlternateScaleNames from "components/Marquee/AlternateScaleNames";

const Title = styled.h1`
  text-align: center;
  font-style: ${p => p.isNamed ? 'default' : 'italic'};
`;

export default function Marquee(props) {
  return (
    <div className={props.className} id='marquee'>
      <Title isNamed={props.isNamed}>
        {props.title}
        {props.inversionText ?
          <em>{props.inversionText}</em> : null
        }
      </Title>
      <AlternateScaleNames intervalSet={props.intervalSet}/>
    </div>
  );
}
