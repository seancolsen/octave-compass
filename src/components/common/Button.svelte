<!-- import React, { ReactNode } from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

interface Props {
  label?: string;
  children?: ReactNode;
  icon?: IconProp;
  onClick?(): void;
  href?: string;
  target?: string;
}

export function Button(props: Props) {
  const content = props.label || props.children;
  return (
    <StyledA {...props}>
      <div>
        { props.icon &&
          <FontAwesomeIcon icon={props.icon} color={'#454545'} />
        }
      </div>
      <div>{content}</div>
    </StyledA>
  )
} -->
