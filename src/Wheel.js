import React, {Component} from 'react';
import Keyboard from "./Keyboard.js";
import Scale from "./Scale.js";

export default class Wheel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyboardRotation: 0,
      scaleRotation: 0
    };
  }

  handleMouseMove = (e) => {
    this.setState({
      scaleRotation: e.clientX / 100,
    });
  };

  render() {
    return (
      <svg
        viewBox={'-100 -100 200 200'}
        onMouseMove={this.handleMouseMove}
      >
        <Keyboard/>
        <Scale rotation={this.state.scaleRotation}/>
      </svg>
    );
  }
}
