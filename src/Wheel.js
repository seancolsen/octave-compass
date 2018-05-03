import React, {Component} from 'react';
import Keyboard from "./Keyboard.js";
import Scale from "./Scale.js";
import IrPoint from "./Utils/IrPoint";
import XyPoint from "./Utils/XyPoint";
import Rotatable from "./Rotatable";

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
    let svgRect = event.target.viewportElement.getBoundingClientRect();
    let cursor = new XyPoint(event.clientX, event.clientY);
    return IrPoint.fromCursor(svgRect, BOX_SIZE, cursor).i;
  }

  /**
   * Called when the user grabs a rotatable element

   * @param {object} event
   *   The mouseDown event
   * @param {object} component
   *   The React component that the user grabbed
   */
  startRotating(event, component) {
    this.setState({
      elementRotating: component,
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
    this.state.elementRotating.setState({
      rotation: Math.round(this.state.elementRotating.state.rotation),
    });
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
        <Rotatable
          onMouseDown={(event, component) => this.startRotating(event, component)}
        >
          <Keyboard/>
        </Rotatable>
        <Rotatable
          onMouseDown={(event, component) => this.startRotating(event, component)}
        >
          <Scale/>
        </Rotatable>
      </svg>
    );
  }
}
