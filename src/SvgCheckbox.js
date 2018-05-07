import React, {Component} from 'react';
import styled from "styled-components";

const size = 6;
const checkMarkCharacter = '✔';

// TODO set stroke
const StyledRect = styled.rect`
  fill: ${props => (props.checked) ? 'white' : '#ddd'};
`;

const StyledText = styled.text`
  font-size: 7px;
`;

export default class SvgCheckbox extends Component {

  static checkMark() {
    return (
      <StyledText
        x={0}
        y={0.75}
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
          rx={2} ry={2}
          checked={this.props.checked}
        />
        {this.props.checked ? SvgCheckbox.checkMark() : null}
      </g>
    );
  }

}
