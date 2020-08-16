import React from 'react';
import styled from 'styled-components';
import { IntervalLabel } from './IntervalLabel';
import { Arc, ArcProps } from '../common/Arc';
import { IrPoint } from '../../../Utils/Geometry/IrPoint';
import { SvgCheckbox } from './SvgCheckbox';
import { useStore } from '../../Store';

const checkboxRadius = 430;
const arcRadius = 430;
const arcSpan = 0.5;

const StyledIntervalLabel = styled(IntervalLabel)``;

const StyledG = styled.g<{clickable: boolean}>`
  & * {
    cursor: ${p => p.clickable ? 'pointer' : 'default'};
  }
  &:hover ${StyledIntervalLabel} {
    text-decoration: ${p => p.clickable ? 'underline' : 'none'};
  }
`;

const Background = styled(Arc)<{active: boolean} & ArcProps>`
  stroke-width: 130px;
  stroke: ${props => (props.active) ? 'white' : '#e4e4e4'};
  fill: none;
  stroke-linecap: butt;
`;

interface Props {
  className?: string;
  interval: number;
  active: boolean;
  label: string;
}

export function BaseInterval(props: Props) {
  const store = useStore();
  const point = (new IrPoint(props.interval, checkboxRadius)).toXy();
  const clickable = props.interval !== 0;
  return (
    <StyledG
      clickable={clickable}
      onClick={() => clickable ?
        store.toggleInterval(props.interval) :
        null
      }
      className={props.className}
    >
      <Background
        startInterval={props.interval - arcSpan}
        endInterval={props.interval + arcSpan}
        radius={arcRadius}
        active={props.active}
      />
      <StyledIntervalLabel
        interval={props.interval}
        label={props.label}
        active={props.active}
      />
      <SvgCheckbox
        x={point.x}
        y={point.y}
        checked={props.active}
        clickable={clickable}
      />
    </StyledG>
  );
}

