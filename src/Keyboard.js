import React, {Component} from 'react';
import Key from "./Key";

import musicTheory from "./Data/musicTheory";

class Keyboard extends Component {

  render() {

    const keys = Object.entries(musicTheory.intervals).map((i) => {
      let interval = parseInt(i[0]);
      return (
        <Key key={interval} interval={interval}/>
      );
    });

    return (
      <g>
        {keys}
      </g>
    );
  }
}

export default Keyboard;
