import React, {Component} from 'react';
import Arc from "components/Wheel/common/Arc";
import styled from 'styled-components';
import {musicTheory} from "Data/musicTheory";

const upperRadius = 465;
const lowerRadius = 480;
const arcSpan = 0.4;

const TextPath = styled(Arc)`
  fill: none;
  stroke: none;
`;

const StyledText = styled.text`
  fill: ${props => props.active ? 'black' : '#AAA'};
  font-size: 30px;
`;

export default class IntervalLabel extends Component {

  /**
   * If the interval we're labeling is on the lower half of the wheel, then we
   * want to treat it a bit differently. This function returns true for those
   * "bottom" intervals.
   *
   * @return {boolean}
   */
  isOnBottom() {
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
          <textPath href={`#${id}`} startOffset={'50%'}>
            {this.props.label}
          </textPath>
        </StyledText>
      </g>
    );
  }
  
}
