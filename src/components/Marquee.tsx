import React from 'react';
import styled from 'styled-components';
import { AlternateScaleNames } from './Marquee/AlternateScaleNames';
import { useStore } from './Store';

interface Props {
  showMore?(): void;
  isWithinModal?: boolean;
  className?: string;
}

export function Marquee(props: Props) {
  const store = useStore();

  const TitleElement = props.isWithinModal ? 'h2' : 'h1';

  const Title = styled(TitleElement)`
    text-align: center;
    font-style: ${store.isNamed ? 'default' : 'italic'};
  `;

  return (
    <div className={props.className} id='marquee'>
      <Title>
        {store.title}
        {store.inversionText && <em>{store.inversionText}</em>}
      </Title>
      <AlternateScaleNames
        intervalSet={store.intervalSet}
        showMore={props.showMore}
        isWithinModal={props.isWithinModal}
      />
    </div>
  );
}
