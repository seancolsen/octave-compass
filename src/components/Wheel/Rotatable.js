import React, {Component} from 'react';
import Group from 'components/Wheel/common/Group';
import Scalar from "Utils/Math/Scalar";
import Wheel from "components/Wheel";
import Ordinal from "Utils/Music/Ordinal";

export default class Rotatable extends Component {

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

  setRotation(rotation) {
    this.setState({rotation: rotation});
  }

  setRotationFromGrabAngle(grabAngle) {
    let angleDragged = grabAngle - this.state.initialGrabAngle;
    this.setRotation(this.state.rotationWhenGrabbed + angleDragged);
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
        {this.props.children(this.state.rotation)}
      </Group>
    );
  }

}
