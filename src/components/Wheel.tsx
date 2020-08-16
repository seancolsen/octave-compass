import React from 'react';
import styled from 'styled-components';
import { BlurFilter } from './Wheel/BlurFilter';
import { Keyboard } from './Wheel/Keyboard';
import { Base } from './Wheel/Base';
import { ScaleComponent } from './Wheel/ScaleComponent';

/**
 * The width and height of the square SVG view box in user units (basically SVG
 * pixels). This number is a bit arbitrary since the SVG is then scaled, but
 * all other numerical measurements within the SVG should be considered
 * relative to this value.
 */
const BOX_SIZE = 1000;

const Container = styled.div`
  & * {
    touch-action: none;
  }
`;

export function Wheel() {

  // constructor(props: {}) {
  //   super(props);
  //   this.state = {
  //     componentsRotating: [],
  //   };
  // }

  // somethingIsRotating() {
  //   return this.state.componentsRotating.length > 0;
  // }

  // scaleIsRotating() {
  //   return this.state.componentsRotating.some(component =>
  //     component instanceof Scale
  //   );
  // }

  /**
   * Compute the angle of the mouse as an interval
   */
  // static grabAngleFromMouseEvent(mouseEvent: React.MouseEvent | React.Touch) {
  //   let target = mouseEvent.target as SVGElement;
  //   let svg = (target.tagName === "svg") ? target : target.viewportElement;
  //   if (!svg) {
  //     throw new Error('Unable to find target SVG element from mouse event');
  //   }
  //   let svgRect = svg.getBoundingClientRect() as DOMRect;
  //   let cursor = new XyPoint(mouseEvent.clientX, mouseEvent.clientY);
  //   return IrPoint.fromCursor(svgRect, BOX_SIZE, cursor).i;
  // }

  /**
   * Compute the angle of the first touch as an interval
   */
  // static grabAngleFromTouchEvent(touchEvent: React.TouchEvent) {
  //   return Wheel.grabAngleFromMouseEvent(touchEvent.touches[0]);
  // }

  // startRotating(component: Rotatable) {
  //   this.setState({
  //     componentsRotating: this.state.componentsRotating.concat(component)
  //   });
  // }

  // setRotationFromGrabAngle(grabAngle: number) {
  //   this.state.componentsRotating.forEach(component => {
  //     component.setRotationFromGrabAngle(grabAngle);
  //   });
  // }

  // handleMouseMove(event: React.MouseEvent) {
  //   this.setRotationFromGrabAngle(Wheel.grabAngleFromMouseEvent(event));
  // }

  // handleTouchMove(event: React.TouchEvent) {
  //   event.preventDefault();
  //   this.setRotationFromGrabAngle(Wheel.grabAngleFromTouchEvent(event));
  // }

  /**
   * Called frequently, any time we have an indication that the user is not
   * rotating anything.
   */
  // stopRotating() {
  //   this.state.componentsRotating.forEach(component => {
  //     component.stopRotating();
  //   });
  //   this.setState({componentsRotating: []});
  // }

  return (
    <Container id='wheel'>
      <svg
        viewBox={`-${BOX_SIZE/2} -${BOX_SIZE/2} ${BOX_SIZE} ${BOX_SIZE}`}
        // onMouseMove={e => this.handleMouseMove(e)}
        // onTouchMove={e => this.handleTouchMove(e)}
        // onMouseLeave={e => this.stopRotating()}
        // onMouseUp={e => this.stopRotating()}
        // onTouchEnd={e => this.stopRotating()}
        // onTouchCancel={e => this.stopRotating()}
        style={{touchAction: 'none'}}
      >

        <BlurFilter id='blur' size={15} bounds={3} />

        <Base
          scaleIsRotating={false}
        />

        {/* <Rotatable
          startRotating={(component: Rotatable) => this.startRotating(component)}
          afterRotating={store.shiftTonalCenter}
        >{ (rotation: number) => ( */}
          <Keyboard
            rotation={0}
            somethingIsRotating={false}
          />
        {/* )}</Rotatable> */}

        {/* <Rotatable
          startRotating={
            (component: Rotatable) => this.startRotating(component)
          }
          afterRotating={store.shiftIntervalSet}
          validRestingRotationValues={
            store.intervalSet.ordinals.map((o: number) => Scalar.wrapToOctave(-o))
          }
        >{ (rotation: number) => ( */}
          <ScaleComponent
            rotation={0}
            somethingIsRotating={false}
          />
        {/* )}</Rotatable> */}

      </svg>
    </Container>
    
  );
}
