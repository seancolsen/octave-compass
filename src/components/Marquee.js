import React from 'react';
import styled from 'styled-components';
import AlternateScaleNames from "components/Marquee/AlternateScaleNames";

export default function Marquee(props) {

  const TitleElement = props.isWithinModal ? 'h2' : 'h1';
  const Title = styled(TitleElement)`
    text-align: center;
    font-style: ${p => p.isNamed ? 'default' : 'italic'};
  `;

  return (
    <div className={props.className} id='marquee'>
      <Title isNamed={props.isNamed} isWithinModal={props.isWithinModal}>
        {props.title}
        {props.inversionText && <em>{props.inversionText}</em>}
      </Title>
      <AlternateScaleNames
        intervalSet={props.intervalSet}
        showMore={props.showMore}
        isWithinModal={props.isWithinModal}
      />
    </div>
  );
}
