import React from 'react';
import styled from 'styled-components';
import { KeyPolygon, KeyPolygonProps } from './common/KeyPolygon';
import { KeyLabelSet, KeyLabelSetProps } from './KeyLabelSet';
import { Pitch } from '../../../Utils/Music/Pitch';
import { useStore } from '../../Store';
import { observer } from 'mobx-react-lite';

const StyledKeyPolygon = styled(KeyPolygon)<{active: boolean} & KeyPolygonProps>`
  fill: ${p => p.active ? '#e1e1e1' : '#b7b7b7'};
  stroke: #a7a7a7;
  stroke-width: 3px;
`;

const StyledKeyLabelSet = styled(KeyLabelSet)<{active: boolean} & KeyLabelSetProps>`
opacity: ${p => p.active ? '1' : '0.25'};
`;

interface KeyProps {
  pitch: Pitch;
  active: boolean;
  rotation: number;
}

export const Key = observer((props: KeyProps) => {
  const store = useStore();
  const isClickable = props.active && store.editVsPlay === 1;
  type GenericEvent = React.MouseEvent | React.TouchEvent;
  const handleMouseDownOrTouchStart = (event: GenericEvent) => {
    event.preventDefault();
    if (!props.active) {
      return;
    }
    store.playNotes([props.pitch.note.id]);
    event.stopPropagation();
  }

  const ClickableG = styled.g`
    & * {
      cursor: pointer;
    }
    &:hover > ${StyledKeyPolygon} {
      fill: #f2f2d2;
    }
  `;
  const BasicG = styled.g``;
  const G = isClickable ? ClickableG : BasicG;
  
  return (
    <G
      onMouseDown={isClickable ? handleMouseDownOrTouchStart : undefined}
      onTouchStart={isClickable ? handleMouseDownOrTouchStart : undefined}
      onTouchEnd={isClickable ? e => e.preventDefault() : undefined}
    >
      <StyledKeyPolygon
        pitch={props.pitch}
        active={props.active}
      />
      <StyledKeyLabelSet
        pitch={props.pitch}
        rotation={props.rotation}
        active={props.active}
      />
    </G>
  );
});
