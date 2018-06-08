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

    handleMouseDown(event) {
      this.startRotating(Wheel.grabAngleFromMouseEvent(event));
    }

    handleTouchStart(event) {
      this.startRotating(Wheel.grabAngleFromTouchEvent(event));
    }

    /**
     * @param {number} initialGrabAngle
     *   The angle (in "interval" units) at which the user grabbed the
     *   rotatable object.
     */
    startRotating(initialGrabAngle) {
      this.setState({
        isRotating: true,
        rotationWhenGrabbed: this.state.rotation,
        initialGrabAngle: initialGrabAngle,
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
          onMouseDown={(event) => this.handleMouseDown(event)}
          onTouchStart={(event) => this.handleTouchStart(event)}
        >
          <WrappedComponent rotation={this.state.rotation} {...this.props} />
        </Group>
      );
    }

  };

}
