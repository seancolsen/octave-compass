import React, {Component} from 'react';
import Keyboard from "./Keyboard.js";
import Scale from "./Scale.js";
import IrPoint from "./Utils/IrPoint";
import XyPoint from "./Utils/XyPoint";
import {musicTheory} from './Data/musicTheory';
import Scalar from "./Utils/Scalar";
import Base from './Base';
import ShadowFilter from "./ShadowFilter";

/**
 * The width and height of the square SVG view box in user units (basically SVG
 * pixels). This number is a bit arbitrary since the SVG is then scaled, but
 * all other numerical measurements within the SVG should be considered
 * relative to this value.
 *
 * @type {number}
 */
const BOX_SIZE = 1000;

export default class Wheel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      componentsRotating: [],
      keyboardIsRotating: false,
      scaleIsRotating: false,
    };
  }

  setKeyboardIsRotating(bool) {
    this.setState({keyboardIsRotating: bool});
  }

  setScaleIsRotating(bool) {
    this.setState({scaleIsRotating: bool});
  }

  somethingIsRotating() {
    return this.state.keyboardIsRotating || this.state.scaleIsRotating;
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

  startRotating(component, name) {
    let state = {
      componentsRotating: this.state.componentsRotating.concat(component)
    };
    if (name === 'Keyboard') {
      state.keyboardIsRotating = true;
    }
    if (name === 'Scale') {
      state.scaleIsRotating = true;
    }
    this.setState(state);
  }

  /**
   * Called as the mouse moves when the user is rotating something.
   *
   * @param {object} event
   *   The mouseMove event
   */
  handleMouseMove(event) {
    this.state.componentsRotating.forEach(component => {
      let angleDragged =
        Wheel.grabAngle(event) - component.state.initialGrabAngle;
      component.setState({
        rotation: component.state.rotationWhenGrabbed + angleDragged,
      });
    });
  }

  /**
   * Called frequently, any time we have the slightest inkling that the user is
   * (no longer?) rotating anything.
   */
  stopRotating() {
    this.state.componentsRotating.forEach(component => {
      component.stopRotating();
    });
    this.setState({
      componentsRotating: [],
      keyboardIsRotating: false,
      scaleIsRotating: false,
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

        <ShadowFilter/>

        <Base
          intervalSet={this.props.intervalSet}
          isRotating={!!this.state.elementRotating}
          toggleInterval={this.props.toggleInterval}
          scaleIsRotating={this.state.scaleIsRotating}
        />

        <Keyboard
          startRotating={component => this.startRotating(component, 'Keyboard')}
          afterRotating={rotation => this.props.shiftTonalCenter(rotation)}
          intervalSet={this.props.intervalSet}
          tonalCenter={this.props.tonalCenter}
          noteSet={this.props.noteSet}
          somethingIsRotating={this.somethingIsRotating()}
        />

        <Scale
          startRotating={component => this.startRotating(component, 'Scale')}
          afterRotating={rotation => this.props.shiftIntervalSet(rotation)}
          intervalSet={this.props.intervalSet}
          selectedChords={this.props.selectedChords}
        />

      </svg>
    );
  }
}
