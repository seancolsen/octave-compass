import React, {Component} from 'react';
import styled from 'styled-components';
import { IrPoint } from '../Utils/Geometry/IrPoint';
import { XyPoint } from '../Utils/Geometry/XyPoint';
import { BlurFilter } from './Wheel/BlurFilter';
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { Keyboard } from './Wheel/Keyboard';
import { Scale } from '../Utils/Music/Scale';
import { Scalar } from '../Utils/Math/Scalar';
import { Base } from './Wheel/Base';
import { Rotatable } from './Wheel/Rotatable';

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

interface Props {
  intervalSet: IntervalSet;
  toggleInterval(ordinal: number): void;
}

interface State {
  componentsRotating: Component[];
}

export class Wheel extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      componentsRotating: [],
    };
  }

  somethingIsRotating() {
    return this.state.componentsRotating.length > 0;
  }

  scaleIsRotating() {
    return this.state.componentsRotating.some(component =>
      component instanceof Scale
    );
  }

  /**
   * Compute the angle of the mouse as an interval
   */
  static grabAngleFromMouseEvent(mouseEvent: React.MouseEvent) {
    let target = mouseEvent.currentTarget as SVGElement;
    let svg = (target.tagName === "svg") ? target : target.viewportElement;
    if (!svg) {
      throw new Error('Unable to find target SVG element from mouse event');
    }
    let svgRect = svg.getBoundingClientRect();
    let cursor = new XyPoint(mouseEvent.clientX, mouseEvent.clientY);
    return IrPoint.fromCursor(svgRect, BOX_SIZE, cursor).i;
  }

  /**
   * Compute the angle of the first touch as an interval
   */
  static grabAngleFromTouchEvent(touchEvent: React.TouchEvent) {
    return Wheel.grabAngleFromMouseEvent(touchEvent.touches[0]);
  }

  startRotating(component: Component) {
    this.setState({
      componentsRotating: this.state.componentsRotating.concat(component)
    });
  }

  setRotationFromGrabAngle(grabAngle: number) {
    this.state.componentsRotating.forEach(component => {
      component.setRotationFromGrabAngle(grabAngle);
    });
  }

  handleMouseMove(event: React.MouseEvent) {
    this.setRotationFromGrabAngle(Wheel.grabAngleFromMouseEvent(event));
  }

  handleTouchMove(event: React.TouchEvent) {
    event.preventDefault();
    this.setRotationFromGrabAngle(Wheel.grabAngleFromTouchEvent(event));
  }

  /**
   * Called frequently, any time we have an indication that the user is not
   * rotating anything.
   */
  stopRotating() {
    this.state.componentsRotating.forEach(component => {
      component.stopRotating();
    });
    this.setState({componentsRotating: []});
  }

  render() {
    return (
      <Container id='wheel'>
        <svg
          viewBox={`-${BOX_SIZE/2} -${BOX_SIZE/2} ${BOX_SIZE} ${BOX_SIZE}`}
          onMouseMove={e => this.handleMouseMove(e)}
          onTouchMove={e => this.handleTouchMove(e)}
          onMouseLeave={e => this.stopRotating()}
          onMouseUp={e => this.stopRotating()}
          onTouchEnd={e => this.stopRotating()}
          onTouchCancel={e => this.stopRotating()}
          style={{touchAction: 'none'}}
        >

          <BlurFilter id='blur' size={15} bounds={3} />

          <Base
            intervalSet={this.props.intervalSet}
            isRotating={!!this.state.elementRotating}
            toggleInterval={this.props.toggleInterval}
            scaleIsRotating={this.scaleIsRotating()}
          />

          <Rotatable
            startRotating={(component: Component) => this.startRotating(component)}
            afterRotating={this.props.shiftTonalCenter}
          >{ (rotation: number) => (
            <Keyboard
              rotation={rotation}
              intervalSet={this.props.intervalSet}
              tonalCenter={this.props.tonalCenter}
              pitchSet={this.props.pitchSet}
              somethingIsRotating={this.somethingIsRotating()}
              playNotes={this.props.playNotes}
            />
          )}</Rotatable>

          <Rotatable
            startRotating={
              (component: Component) => this.startRotating(component)
            }
            afterRotating={this.props.shiftIntervalSet}
            validRestingRotationValues={
              this.props.intervalSet.ordinals.map((o: number) => Scalar.wrapToOctave(-o))
            }
          >{ (rotation: number) => (
            <Scale
              rotation={rotation}
              intervalSet={this.props.intervalSet}
              selectedChords={this.props.selectedChords}
              somethingIsRotating={this.somethingIsRotating()}
              playOrdinalChord={this.props.playOrdinalChord}
              ordinalChordsPlayed={this.props.ordinalChordsPlayed}
            />
          )}</Rotatable>

        </svg>
      </Container>
    );
  }
}
