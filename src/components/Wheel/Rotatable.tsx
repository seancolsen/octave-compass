import React, { Component, ReactNode } from 'react';
import { Scalar } from '../../Utils/Math/Scalar';
import { Ordinal } from '../../Utils/Music/Ordinal';
import { Wheel } from '../Wheel';
import { Group } from './common/Group';

interface Props {
  validRestingRotationValues?: number[];
  children(rotation: number): ReactNode;
  startRotating(component: Component): void;
  afterRotating(restingRotation: number): void;
}

interface State {
  rotation: number,
  isRotating: boolean,
  rotationWhenGrabbed: number | null,
  initialGrabAngle: number | null,
}

export class Rotatable extends Component<Props, State> {

  constructor(props: Props) {
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
   */
  restingRotation(): number {
    const rotation = Scalar.wrapToOctave(this.state.rotation);
    const validValues = this.props.validRestingRotationValues;
    if (!validValues) {
      return Math.round(Scalar.wrapToOctave(rotation));
    }
    return Ordinal.nearestValid(rotation, validValues);
  }

  handleMouseDown(event: React.MouseEvent) {
    this.startRotating(Wheel.grabAngleFromMouseEvent(event));
  }

  handleTouchStart(event: React.TouchEvent) {
    event.preventDefault();
    this.startRotating(Wheel.grabAngleFromTouchEvent(event));
  }

  /**
   * @param initialGrabAngle The angle (in "interval" units) at which the user
   *   grabbed the rotatable object.
   */
  startRotating(initialGrabAngle: number) {
    this.setState({
      isRotating: true,
      rotationWhenGrabbed: this.state.rotation,
      initialGrabAngle: initialGrabAngle,
    });
    this.props.startRotating(this);
  }

  setRotation(rotation: number) {
    this.setState({rotation: rotation});
  }

  setRotationFromGrabAngle(grabAngle: number) {
    let initialGrabAngle = this.state.initialGrabAngle || 0;
    let rotationWhenGrabbed = this.state.rotationWhenGrabbed || 0;
    let angleDragged = grabAngle - initialGrabAngle;
    this.setRotation(rotationWhenGrabbed + angleDragged);
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
        onMouseDown={(event: React.MouseEvent) => this.handleMouseDown(event)}
        onTouchStart={(event: React.TouchEvent) => this.handleTouchStart(event)}
      >
        {this.props.children(this.state.rotation)}
      </Group>
    );
  }

}
