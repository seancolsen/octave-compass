import React, {Component} from 'react';
import Group from './Group';

export default function Rotatable(WrappedComponent) {

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        rotation: 0,
      }
    }

    handleMouseDown(event) {
      this.props.onMouseDown(event, this);
    }

    render() {
      return (
        <Group
          rotation={this.state.rotation}
          onMouseDown={(event) => this.handleMouseDown(event)}
        >
          <WrappedComponent rotation={this.state.rotation} {...this.props} />
        </Group>
      );

    }

  };

}
