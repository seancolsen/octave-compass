import React, {Component} from 'react';
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
  fill: ${props => props.active ? 'black' : '#AAA'};
  font-size: 30px;
`;

interface Props {
  interval: number;
  className?: string;
  label: string;
  active: boolean;
}

export class IntervalLabel extends Component<Props> {

  /**
   * If the interval we're labeling is on the lower half of the wheel, then we
   * want to treat it a bit differently. This function returns true for those
   * "bottom" intervals.
   */
  isOnBottom(): boolean {
    const revolution = this.props.interval / musicTheory.octaveDivisions;
    return (revolution > 0.25) && (revolution < 0.75);
  }
  
  render() {
    const b = this.isOnBottom();
    const id = `interval-label-${this.props.interval}`;
    return (
      <g className={this.props.className}>
        <TextPath
          id={id}
          radius={b ? lowerRadius : upperRadius}
          startInterval={this.props.interval + (arcSpan * (b ? 1 : -1))}
          endInterval={this.props.interval + (arcSpan * (b ? -1 : 1))}
        />
        <StyledText active={this.props.active} textAnchor={'middle'}>
          <textPath xlinkHref={`#${id}`} href={`#${id}`} startOffset={'50%'}>
            {this.props.label}
          </textPath>
        </StyledText>
      </g>
    );
  }
  
}
