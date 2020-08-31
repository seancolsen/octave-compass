import React from 'react';
import styled from 'styled-components';
import { Keyboard } from './Wheel/Keyboard';
import { Base } from './Wheel/Base';
import { ScaleComponent } from './Wheel/ScaleComponent';
import { Rotator } from './Wheel/Rotator';
import { useStore } from './Store';
import { Scalar } from '../Utils/Math/Scalar';
import { observer } from 'mobx-react-lite';
import { ShadowFilter } from './Wheel/ShadowFilter';
import { IntervalSetPolygon } from './common/IntervalSetPolygon';

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

  const StyledIntervalSetPolygon = styled(IntervalSetPolygon)`
    fill: #b7b7b7;
    stroke: #a7a7a7;
    stroke-width: 3px;
  `;

  return (

    <Container id='wheel'>
      <svg viewBox={`-${BOX_SIZE/2} -${BOX_SIZE/2} ${BOX_SIZE} ${BOX_SIZE}`}>

        <ShadowFilter
          id='shadow-when-edit'
          blurRadius={15}
          opacity={store.editVsPlay === 0 ? 1 : 0}
          bounds={3}
        />
        <ShadowFilter
          id='shadow-when-play'
          blurRadius={15}
          opacity={store.editVsPlay === 0 ? 0 : 1}
          bounds={3}
        />

        <Base scaleIsRotating={store.scaleIsRotating} />

        {store.editVsPlay === 1 ?
          <StyledIntervalSetPolygon intervalSet={store.intervalSet} />
          : null
        }
        
        <Rotator
          isRotatable={store.editVsPlay === 0}
          onRotationStart={() => store.keyboardIsRotating = true}
          onRotationRest={r => {store.keyboardIsRotating = false; store.shiftTonalCenter(r)}}
        >{({rotation, currentDetent}) =>
          <Keyboard
            rotation={rotation}
            somethingIsRotating={store.keyboardIsRotating || store.scaleIsRotating}
          />
        }</Rotator>

        <Rotator
          isRotatable={store.editVsPlay === 0}
          detents={store.intervalSet.ordinals.map((o) => Scalar.wrapToOctave(-o))}
          onRotationStart={() => store.scaleIsRotating = true}
          onRotationRest={r => {store.scaleIsRotating = false; store.shiftIntervalSet(r)}}
        >{({rotation, currentDetent}) =>
          <ScaleComponent
            rotation={rotation}
            somethingIsRotating={store.keyboardIsRotating || store.scaleIsRotating}
          />
        }</Rotator>

        {/* TODO: build this component and then uncomment */}
        {/* <ModeShiftHelpText currentDetent={scaleRotator.currentDetent}/> */}

      </svg>
    </Container>
    
  );
})
