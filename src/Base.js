import React, {Component} from 'react';
import BaseInterval from "./BaseInterval";
import {musicTheory} from "./Data/musicTheory";

export default class Base extends Component {

  /**
   * @param {int} interval
   * @return {boolean}
   */
  intervalIsActive(interval) {
    return (this.props.isRotating) ? false :
      this.props.intervalSet.isActive(interval);
  }

  /**
   * @return {[BaseInterval]}
   */
  baseIntervals() {
    return Object.keys(musicTheory.intervals).map(interval =>
      <BaseInterval
        key={interval}
        interval={interval}
        active={this.intervalIsActive(interval)}
        onClick={() => this.props.toggleInterval(interval)}
      />
    );
  }

  render() {
    return <g>{this.baseIntervals()}</g>;
  }

}
