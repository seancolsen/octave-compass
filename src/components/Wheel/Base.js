import React, {Component} from 'react';
import BaseInterval from "components/Wheel/Base/BaseInterval";
import {musicTheory} from "Data/musicTheory";

export default class Base extends Component {

  /**
   * @param {int} interval
   * @return {boolean}
   */
  intervalIsActive(interval) {
    return (this.props.scaleIsRotating) ? false :
      this.props.intervalSet.isActive(interval);
  }

  /**
   * @return {[BaseInterval]}
   */
  baseIntervals() {
    return musicTheory.intervals.map((name, ordinal) =>
      <BaseInterval
        key={ordinal}
        interval={ordinal}
        label={name}
        active={this.intervalIsActive(ordinal)}
        onClick={() => this.props.toggleInterval(ordinal)}
      />
    );
  }

  render() {
    return <g>{this.baseIntervals()}</g>;
  }

}
