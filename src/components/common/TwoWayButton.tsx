import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Label = styled.div`
  text-align: center;
`;

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-column-gap: 0.4vmax;
  padding: 0.7vmin;
  border: solid 1px #c4c4c4;
  border-radius: 0.4vmax;
  & ${Label} {
    grid-column: 1 / span 2;
  }
`;

interface Props {
  /**
   * When true, swap the `-1` and `1` values that are passed to `stepFunction`
   * when pressing one of the two buttons.
   */
  inverted?: boolean;

  /**
   * The individual labels displayed for each button. If no value is passed,
   * then the first button will display a `-` character and the scond button
   * will display a `+` character.
   */
  buttonLabels?: [string, string];

  /**
   * The icons displayed for each button. If no value is passed, then no icons
   * will be displayed.
   */
  icons?: [IconProp, IconProp];
  
  /**
   * The overall label displayed for both buttons.
   */
  label: string;

  className?: string;

  /**
   * This is the function that gets executed when pressing the buttons. When the
   * first button is pressed, this component will pass `1` as the value for
   * `direction`; and when the second button is pressed this component will pass
   * `-1`. However if `true` is passed as the value for `inverted`, then these
   * values are inverted.
   */
  stepFunction: (direction: number) => void;
}

export function TwoWayButton(props: Props) {
  const sign = props.inverted ? -1 : 1;
  const buttonLabels = props.buttonLabels || ['-', '+'];
  const icons = props.icons || [];
  return (
    <Container className={props.className}>
      <Label>{props.label}</Label>
      <Button
        onClick={() => props.stepFunction(1 * sign)}
        icon={icons[0]}
      >
        {buttonLabels[0]}
      </Button>
      <Button
        onClick={() => props.stepFunction(-1 * sign)}
        icon={icons[1]}
      >
        {buttonLabels[1]}
      </Button>
    </Container>
  );
}
