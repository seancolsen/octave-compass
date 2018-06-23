import React from 'react';
import TwoWayButton from "components/common/TwoWayButton";
import styled from 'styled-components';
import Button from "components/common/Button";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1vmax 0;
  & > * {
    margin: 0 0.7vmax;
  }
`;

export default function Toolbar(props) {
  return (
    <Container id={'toolbar'}>
      <Button
        className="corner bottom left"
        onClick={() => props.showNotation()}
        icon='music'
        label={'staff'}
      />
      <TwoWayButton
        label='Transpose'
        stepFunction={props.shiftTonalCenter}
        buttonLabels={['down', 'up']}
        icons={['minus', 'plus']}
      />
      <TwoWayButton
        label='Mode'
        stepFunction={props.shiftIntervalSet}
        buttonLabels={['prev', 'next']}
        icons={['caret-left', 'caret-right']}
      />
      <Button
        className="corner bottom right"
        icon={['fab', 'github']}
        href={'https://github.com/seanmadsen/octave-compass'}
        target={'_blank'}
        label={'about'}
      />
    </Container>
  );
}

