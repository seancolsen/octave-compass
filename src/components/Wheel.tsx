import React from 'react';
import styled from 'styled-components';
import { BlurFilter } from './Wheel/BlurFilter';
import { Keyboard } from './Wheel/Keyboard';
import { Base } from './Wheel/Base';
import { ScaleComponent } from './Wheel/ScaleComponent';
import { useRotator } from './Wheel/useRotator';
import { useStore } from './Store';
import { Scalar } from '../Utils/Math/Scalar';
import { useObserver, observer } from 'mobx-react-lite';

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
  
  const keyboardRotator = useRotator({
    afterRotating: store.shiftTonalCenter,
  });
  
  const scaleRotator = useRotator({
    afterRotating: store.shiftIntervalSet,
    detents: store.intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o)),
  });

  return (

    <Container id='wheel'>
      <svg viewBox={`-${BOX_SIZE/2} -${BOX_SIZE/2} ${BOX_SIZE} ${BOX_SIZE}`} >

        <BlurFilter id='blur' size={15} bounds={3} />

        <Base scaleIsRotating={scaleRotator.isRotating} />
        
        <keyboardRotator.Container>
          <Keyboard
            rotation={keyboardRotator.rotation}
            somethingIsRotating={
              scaleRotator.isRotating || keyboardRotator.isRotating
            }
          />
        </keyboardRotator.Container>

        <scaleRotator.Container>
          <ScaleComponent
            rotation={scaleRotator.rotation}
            somethingIsRotating={
              scaleRotator.isRotating || keyboardRotator.isRotating
            }
          />
        </scaleRotator.Container>

      </svg>
    </Container>
    
  );
})
