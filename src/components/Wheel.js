import React, {Component} from 'react';
import Keyboard from "components/Wheel/Keyboard";
import Scale from "components/Wheel/Scale";
import IrPoint from "Utils/Geometry/IrPoint";
import XyPoint from "Utils/Geometry/XyPoint";
import Base from 'components/Wheel/Base';
import styled from 'styled-components';
import Scalar from "Utils/Math/Scalar";
import BlurFilter from "components/Wheel/BlurFilter";
import Rotatable from "components/Wheel/Rotatable";

/**
 * The width and height of the square SVG view box in user units (basically SVG
 * pixels). This number is a bit arbitrary since the SVG is then scaled, but
 * all other numerical measurements within the SVG should be considered
 * relative to this value.
 *
 * @type {number}
 */
const BOX_SIZE = 1000;

const Container = styled.div`
  & * {
    touch-action: none;
  }
`;

export default class Wheel extends Component {

  constructor(props) {
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
   *
   * @param {object} mouseEvent
   * @return {number}
   */
  static grabAngleFromMouseEvent(mouseEvent) {
    let target = mouseEvent.target;
    let svg = (target.tagName === "svg") ? target : target.viewportElement;
    let svgRect = svg.getBoundingClientRect();
    let cursor = new XyPoint(mouseEvent.clientX, mouseEvent.clientY);
    return IrPoint.fromCursor(svgRect, BOX_SIZE, cursor).i;
  }

  /**
   * Compute the angle of the first touch as an interval
   *
   * @param {object} touchEvent
   * @return {number}
   */
  static grabAngleFromTouchEvent(touchEvent) {
    return Wheel.grabAngleFromMouseEvent(touchEvent.touches[0]);
  }

  startRotating(component) {
    this.setState({
      componentsRotating: this.state.componentsRotating.concat(component)
    });
  }

  setRotationFromGrabAngle(grabAngle) {
    this.state.componentsRotating.forEach(component => {
      component.setRotationFromGrabAngle(grabAngle);
    });
  }

  handleMouseMove(event) {
    this.setRotationFromGrabAngle(Wheel.grabAngleFromMouseEvent(event));
  }

  handleTouchMove(event) {
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

          <BlurFilter id='blur' size='15' bounds='3' />

          <Base
            intervalSet={this.props.intervalSet}
            isRotating={!!this.state.elementRotating}
            toggleInterval={this.props.toggleInterval}
            scaleIsRotating={this.scaleIsRotating()}
          />

          <Rotatable
            startRotating={component => this.startRotating(component)}
            afterRotating={this.props.shiftTonalCenter}
          >{ rotation => (
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
            startRotating={component => this.startRotating(component)}
            afterRotating={this.props.shiftIntervalSet}
            validRestingRotationValues={
              this.props.intervalSet.ordinals.map(o => Scalar.wrapToOctave(-o))
            }
          >{ rotation => (
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
