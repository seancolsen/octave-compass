import React from 'react';
import styled from 'styled-components';
import { AlternateScaleNames } from './Marquee/AlternateScaleNames';
import { IntervalSet } from '../Utils/Music/IntervalSet';

interface Props {
  intervalSet: IntervalSet;
  showMore?(): void;
  title: string;
  isWithinModal?: boolean;
  isNamed: boolean;
  className?: string;
  inversionText?: string;
}

export function Marquee(props: Props) {

  const TitleElement = props.isWithinModal ? 'h2' : 'h1';

  const Title = styled(TitleElement)<{isNamed: boolean}>`
    text-align: center;
    font-style: ${p => p.isNamed ? 'default' : 'italic'};
  `;

  return (
    <div className={props.className} id='marquee'>
      <Title isNamed={props.isNamed}>
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
