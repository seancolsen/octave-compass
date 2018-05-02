import React, {Component} from 'react';
import Keyboard from "./Keyboard.js";
import Scale from "./Scale.js";

export default class Wheel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elementRotating: null,
    };
  }

  startRotating(event, component) {
    this.setState({
      elementRotating: component,
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
        viewBox={'-100 -100 200 200'}
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
