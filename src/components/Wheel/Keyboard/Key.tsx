import React from 'react';
import styled from 'styled-components';
import { KeyPolygon, KeyPolygonProps } from './common/KeyPolygon';
import { KeyLabelSet, KeyLabelSetProps } from './KeyLabelSet';
import { Pitch } from '../../../Utils/Music/Pitch';

const StyledKeyPolygon = styled(KeyPolygon)<{active: boolean} & KeyPolygonProps>`
  fill: ${p => p.active ? '#e1e1e1' : '#b7b7b7'};
  stroke: #a7a7a7;
  stroke-width: 3px;
`;

const InactiveG = styled.g`
  & * {
    cursor: grab;
  }
`;

const StyledKeyLabelSet = styled(KeyLabelSet)<{active: boolean} & KeyLabelSetProps>`
opacity: ${p => p.active ? '1' : '0.25'};
`;

const ActiveG = styled.g`
  & * {
    cursor: pointer;
  }
  &:hover > ${StyledKeyPolygon} {
    fill: #f2f2d2;
  }
`;

interface KeyProps {
  pitch: Pitch;
  active: boolean;
  playNotes?(n: number[]): void;
  rotation: number;
}

export function Key(props: KeyProps) {

  type GenericEvent = React.MouseEvent | React.TouchEvent;
  const handleMouseDownOrTouchStart = (event: GenericEvent) => {
    event.preventDefault();
    if (!props.playNotes) {
      return;
    }
    props.playNotes([props.pitch.note.id]);
    event.stopPropagation();
  }

  const G = props.active ? ActiveG : InactiveG;
  
  return (
    <G
      onMouseDown={e => handleMouseDownOrTouchStart(e)}
      onTouchStart={e => handleMouseDownOrTouchStart(e)}
      onTouchEnd={e => e.preventDefault()}
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
}
