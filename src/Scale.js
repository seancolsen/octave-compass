import React, {Component} from 'react';
import Polygon from "./Polygon.js";

const RADIUS = 56;

export default class Scale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rotation: 0
    };
  }

  handleClick = () => {
    this.setState({
      rotation: this.state.rotation + 1,
    });
  };

  render() {
    let intervals = [0, 2, 4, 5, 7, 9, 11];
    let points = intervals.map(v => [v, RADIUS]);
    return (
      <Polygon
        points={points}
        rotation={this.state.rotation}
        onClick={this.handleClick}
      />
    );
  }

}
