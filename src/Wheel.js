import React, {Component} from 'react';
import Keyboard from "./Keyboard.js";
import Scale from "./Scale.js";
import IrPoint from "./Utils/IrPoint";
import XyPoint from "./Utils/XyPoint";
import {musicTheory} from './Data/musicTheory';
import Scalar from "./Utils/Scalar";
import Base from './Base';

/**
 * The width and height of the square SVG view box. This number is a bit
 * arbitrary since the SVG is then scaled.
 *
 * @type {number}
 */
const BOX_SIZE = 200;

export default class Wheel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elementRotating: null,
      angleWhenGrabbed: null,
      angleOfGrab: null,
    };
  }

  /**
   * Compute the angle of the mouse as an interval
   *
   * @param {object} event
   * @return {number}
   */
  static grabAngle(event) {
    let target = event.target;
    let svg = (target.tagName === "svg") ? target : target.viewportElement;
    let svgRect = svg.getBoundingClientRect();
    let cursor = new XyPoint(event.clientX, event.clientY);
    return IrPoint.fromCursor(svgRect, BOX_SIZE, cursor).i;
  }

  /**
   * Called when the user grabs a rotatable element

   * @param {object} event
   *   The mouseDown event
   * @param {object} component
   *   The React component that the user grabbed
   * @param {string} componentType
   *   (e.g. 'Keyboard', 'Scale'
   */
  startRotating(event, component, componentType) {
    this.setState({
      elementRotating: component,
      elementRotatingType: componentType,
      rotationWhenGrabbed: component.state.rotation,
      initialGrabAngle: Wheel.grabAngle(event),
    });
  }

  /**
   * Called frequently, any time we have the slightest inkling that the user is
   * (no longer?) rotating anything.
   */
  stopRotating() {
    if (!this.state.elementRotating) {
      return;
    }
    const rotation = this.state.elementRotating.state.rotation;
    const divisions = musicTheory.octaveDivisions;
    const wholeRotation = Math.round(Scalar.wrap(rotation, divisions));
    if (this.state.elementRotatingType === 'Keyboard') {
      this.state.elementRotating.setState({
        rotation: wholeRotation,
      });
      this.props.setTonalCenter(divisions - wholeRotation);
    }
    if (this.state.elementRotatingType === 'Scale') {
      this.state.elementRotating.setState({
        rotation: 0,
      });
      this.props.shiftIntervalSet(wholeRotation);
    }
    this.setState({
      elementRotating: null,
    });
  }

  /**
   * Called as the mouse moves when the user is rotating something.
   *
   * @param {object} event
   *   The mouseMove event
   */
  handleMouseMove(event) {
    if (!this.state.elementRotating) {
      return;
    }
    let angleDragged = Wheel.grabAngle(event) - this.state.initialGrabAngle;
    this.state.elementRotating.setState({
      rotation:
        this.state.rotationWhenGrabbed + angleDragged,
    });
  }

  render() {
    return (
      <svg
        viewBox={`-${BOX_SIZE/2} -${BOX_SIZE/2} ${BOX_SIZE} ${BOX_SIZE}`}
        onMouseMove={(event) => this.handleMouseMove(event)}
        onMouseLeave={() => this.stopRotating()}
        onMouseUp={() => this.stopRotating()}
      >

        <Base
          intervalSet={this.props.intervalSet}
          isRotating={!!this.state.elementRotating}
        />

        <Keyboard
          onMouseDown={(event, component, componentType) =>
            this.startRotating(event, component, componentType)
          }
          intervalSet={this.props.intervalSet}
          isRotating={!!this.state.elementRotating}
        />

        <Scale
          onMouseDown={(event, component, componentType) =>
            this.startRotating(event, component, componentType)
          }
          intervalSet={this.props.intervalSet}
        />

      </svg>
    );
  }
}
