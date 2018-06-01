import React, {Component} from 'react';
import styled from "styled-components";

const size = 30;
const checkMarkCharacter = '✔';

const StyledRect = styled.rect`
  fill: ${props => (props.checked) ? 'white' : '#ddd'};
  stroke: #666;
  stroke-width: 2px;
`;

const StyledText = styled.text`
  font-size: 35px;
  font-family: 'Roboto', sans-serif;
`;

export default class SvgCheckbox extends Component {

  static checkMark() {
    return (
      <StyledText
        x={1}
        y={5}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
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
        />
        {this.props.checked ? SvgCheckbox.checkMark() : null}
      </g>
    );
  }

}
