import React, {Component} from 'react';
import Group from 'components/Wheel/common/Group';
import Scalar from "Utils/Math/Scalar";
import {musicTheory} from "Data/musicTheory";
import Wheel from "components/Wheel";

export default function Rotatable(WrappedComponent) {

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        rotation: 0,
        isRotating: false,
        rotationWhenGrabbed: null,
        initialGrabAngle: null,
      }
    }

    /**
     * Called when the user grabs a rotatable element

     * @param {object} event
     *   The mouseDown event
     */
    startRotating(event) {
      this.setState({
        isRotating: true,
        rotationWhenGrabbed: this.state.rotation,
        initialGrabAngle: Wheel.grabAngle(event),
      });
      this.props.startRotating(this);
    }

    stopRotating() {
      if (!this.state.isRotating) {
        return;
      }
      const wholeRotation = Math.round(Scalar.wrap(
        this.state.rotation,
        musicTheory.octaveDivisions
      ));
      this.setState({
        isRotating: false,
        rotation: 0,
      });
      this.props.afterRotating(wholeRotation);
    }

    render() {
      return (
        <Group
          rotation={this.state.rotation}
          onMouseDown={(event) => this.startRotating(event)}
        >
          <WrappedComponent rotation={this.state.rotation} {...this.props} />
        </Group>
      );

    }

  };

}
