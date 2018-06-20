import React, {Component} from 'react';
import Group from 'components/Wheel/common/Group';
import Scalar from "Utils/Math/Scalar";
import Wheel from "components/Wheel";
import Ordinal from "Utils/Music/Ordinal";

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
     * When the user is done rotating this object, use this function to
     * determine the nearest valid resting rotation value.
     *
     * @return {number}
     */
    restingRotation() {
      const rotation = Scalar.wrapToOctave(this.state.rotation);
      const validValues = this.props.validRestingRotationValues;
      if (!validValues) {
        return Math.round(Scalar.wrapToOctave(rotation));
      }
      return Ordinal.nearestValid(rotation, validValues);
    }

    handleMouseDown(event) {
      this.startRotating(Wheel.grabAngleFromMouseEvent(event));
    }

    handleTouchStart(event) {
      event.preventDefault();
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
      this.setState({
        isRotating: false,
        rotation: 0,
      });
      this.props.afterRotating(this.restingRotation());
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
