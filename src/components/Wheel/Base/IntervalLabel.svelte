<script lang="ts">

</script>

<!-- import React from 'react';
import styled from 'styled-components';
import { Arc, ArcProps } from '../common/Arc';
import { musicTheory } from '../../../Data/musicTheory';

const upperRadius = 465;
const lowerRadius = 480;
const arcSpan = 0.4;

const TextPath = styled(Arc)<ArcProps>`
  fill: none;
  stroke: none;
`;

const StyledText = styled.text<{active: boolean}>`
  fill: ${props => props.active ? '#DDD' : '#444'};
  font-size: 30px;
`;

interface Props {
  interval: number;
  className?: string;
  label: string;
  active: boolean;
}

export function IntervalLabel(props: Props) {

  /**
   * If the interval we're labeling is on the lower half of the wheel, then we
   * want to treat it a bit differently. This value is true for those
   * "bottom" intervals.
   */
  const isOnBottom = (() => {
    const revolution = props.interval / musicTheory.octaveDivisions;
    return (revolution > 0.25) && (revolution < 0.75);
  })();
  
  const id = `interval-label-${props.interval}`;

  return (
    <g className={props.className}>
      <TextPath
        id={id}
        radius={isOnBottom ? lowerRadius : upperRadius}
        startInterval={props.interval + (arcSpan * (isOnBottom ? 1 : -1))}
        endInterval={props.interval + (arcSpan * (isOnBottom ? -1 : 1))}
      />
      <StyledText active={props.active} textAnchor={'middle'}>
        <textPath xlinkHref={`#${id}`} href={`#${id}`} startOffset={'50%'}>
          {props.label}
        </textPath>
      </StyledText>
    </g>
  );
} -->
