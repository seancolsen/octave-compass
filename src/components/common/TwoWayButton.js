import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';

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

export default function TwoWayButton(props) {
  const sign = props.inverted ? 1 : -1;
  const buttonLabels = props.buttonLabels || ['-', '+'];
  const icons = props.icons || [];
  return (
    <Container className={props.className}>
      <Label>{props.label}</Label>
      <Button
        onClick={() => props.stepFunction(-1 * sign)}
        icon={icons[0]}
      >
        {buttonLabels[0]}
      </Button>
      <Button
        onClick={() => props.stepFunction(sign)}
        icon={icons[1]}
      >
        {buttonLabels[1]}
      </Button>
    </Container>
  );
}
