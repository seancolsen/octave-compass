import React, { Component } from 'react';
import { BaseInterval } from './Base/BaseInterval';
import { IntervalSet } from '../../Utils/Music/IntervalSet';
import { musicTheory } from '../../Data/musicTheory';

interface Props {
  scaleIsRotating: boolean;
  intervalSet: IntervalSet;
  toggleInterval(ordinal: number): void;
}

export class Base extends Component<Props> {

  intervalIsActive(interval: number): boolean {
    return (this.props.scaleIsRotating) ? false :
      this.props.intervalSet.isActive(interval);
  }

  baseIntervals() {
    return musicTheory.intervals.map((name, ordinal) =>
      <BaseInterval
        key={ordinal}
        interval={ordinal}
        label={name}
        active={this.intervalIsActive(ordinal)}
        toggleInterval={this.props.toggleInterval}
      />
    );
  }

  render() {
    return <g>{this.baseIntervals()}</g>;
  }

}