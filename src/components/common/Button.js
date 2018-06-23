import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const StyledA = styled.a`
  padding: 0.4vmax 0.7vmax;
  border-radius: 0.4vmax;
  background: #f2f2f2;
  border: solid 0.1vmax #bcbcbc;
  cursor: pointer;
  display: inline-block;
  line-height: 1.7vmax;
  text-align: center;
  outline: none;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    background-color: white;
  }
`;

export default function Button(props) {
  return (
    <StyledA {...props}>
      <div>
        { props.icon &&
          <FontAwesomeIcon icon={props.icon} color={'#454545'} />
        }
      </div>
      <div>{props.children}</div>
    </StyledA>
  )
}
