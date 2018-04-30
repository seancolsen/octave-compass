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

  handleClick = (e) => {
    console.log(e.target);
    this.setState({
      rotation: this.state.rotation + 1,
    });
  };

  render() {
    let intervals = [0, 2, 4, 5, 7, 9, 11];
    let points = intervals.map(v => [v, RADIUS]);
    let children = <Polygon points={points}/>;
    return (
      <Group
        onClick={this.handleClick}
        children={children}
        rotation={this.state.rotation}
      />
    );
  }

}
