import React, {Component} from 'react';
import Keyboard from "./Keyboard.js";
import Scale from "./Scale.js";

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
      rotationWhenGrabbed: null,
    };
  }

  startRotating(event, component) {
    let svg = event.target.viewportElement.getBoundingClientRect();
    this.setState({
      elementRotating: component,
      rotationWhenGrabbed: this.state.rotationWhenGrabbed,
      grabAngle: 0,
    });
  }

  stopRotating() {
    this.setState({
      elementRotating: null,
    });
  }

  handleMouseMove(event) {
    if (!this.state.elementRotating) {
      return;
    }
    this.state.elementRotating.setState({
      rotation: event.clientX / 100,
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
        <Keyboard/>
        <Scale
          onMouseDown={(event, component) => this.startRotating(event, component)}
        />
      </svg>
    );
  }
}
