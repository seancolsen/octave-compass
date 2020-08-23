import React from 'react';
import styled from 'styled-components';
import { BlurFilter } from './Wheel/BlurFilter';
import { Keyboard } from './Wheel/Keyboard';
import { Base } from './Wheel/Base';
import { ScaleComponent } from './Wheel/ScaleComponent';
import { Rotator } from './Wheel/Rotator';
import { useStore } from './Store';
import { Scalar } from '../Utils/Math/Scalar';
import { observer } from 'mobx-react-lite';

/**
 * The width and height of the square SVG view box in user units (basically SVG
 * pixels). This number is a bit arbitrary since the SVG is then scaled, but
 * all other numerical measurements within the SVG should be considered
 * relative to this value.
 */
export const BOX_SIZE = 1000;

const Container = styled.div`
  & * {
    touch-action: none;
  }
`;

export const Wheel = observer(() => {

  const store = useStore();

  return (

    <Container id='wheel'>
      <svg viewBox={`-${BOX_SIZE/2} -${BOX_SIZE/2} ${BOX_SIZE} ${BOX_SIZE}`}>

        <BlurFilter id='blur' size={15} bounds={3} />

        <Base scaleIsRotating={false} />
        
        <Rotator
          afterRotating={store.shiftTonalCenter}
        >{({rotation, currentDetent}) =>
          <Keyboard
            rotation={rotation}
            somethingIsRotating={false}
          />
        }</Rotator>

        <Rotator
          detents={store.intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o))}
          afterRotating={store.shiftIntervalSet}
        >{({rotation, currentDetent}) =>
          <ScaleComponent
            rotation={rotation}
            somethingIsRotating={false}
          />
        }</Rotator>

        {/* TODO: build this component and then uncomment */}
        {/* <ModeShiftHelpText currentDetent={scaleRotator.currentDetent}/> */}

      </svg>
    </Container>
    
  );
})
