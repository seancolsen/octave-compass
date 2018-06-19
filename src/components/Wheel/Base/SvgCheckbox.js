import React, {Component} from 'react';
import styled from "styled-components";

const size = 30;
const checkMarkCharacter = '✔';

const StyledRect = styled.rect`
  fill: ${props => (props.checked) ? 'white' : '#ddd'};
  stroke: ${p => p.clickable ? '#666' : '#BBB'};
  stroke-width: 2px;
`;

const StyledText = styled.text`
  font-size: 35px;
  fill: ${p => p.clickable ? 'black' : '#BBB'};
`;

export default class SvgCheckbox extends Component {

  checkMark() {
    return (
      <StyledText
        x={1}
        y={5}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
        clickable={this.props.clickable}
      >
        {checkMarkCharacter}
      </StyledText>
    );
  }

  render() {
    const transform = `translate(${this.props.x} ${this.props.y})`;
    return (
      <g transform={transform}>
        <StyledRect
          x={-size / 2} y={-size / 2}
          width={size} height={size}
          rx={size / 5} ry={size / 5}
          checked={this.props.checked}
          clickable={this.props.clickable}
        />
        {this.props.checked ? this.checkMark() : null}
      </g>
    );
  }

}
