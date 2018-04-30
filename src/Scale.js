import React, {Component} from 'react';
import Polygon from "./Polygon.js";
import Group from './Group.js';

const RADIUS = 56;

export default class Scale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rotation: 0
    };
  }

  handleMouseMove = (e) => {
    this.setState({
      rotation: e.clientX / 100,
    });
  };

  render() {
    let intervals = [0, 2, 4, 5, 7, 9, 11];
    let points = intervals.map(v => [v, RADIUS]);
    return (
      <Group
        onMouseMove={this.handleMouseMove}
        rotation={this.state.rotation}
      >
        <Polygon points={points}/>
      </Group>
    );
  }

}
